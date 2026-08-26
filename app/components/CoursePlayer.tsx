'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, CircleHelp, Flame, Lock, Play, RotateCcw, Sparkles, Trophy, Zap } from 'lucide-react';
import type { Course, Lesson } from '@/lib/courses';
import { getAllLessons } from '@/lib/courses';

type Progress = { completed: string[]; xp: number; streak: number; lastPlayed: string | null };
const keyFor = (courseId: string) => `virtunex-progress-${courseId}`;
const defaultProgress: Progress = { completed: [], xp: 0, streak: 0, lastPlayed: null };

function levelFor(xp: number) { return Math.floor(xp / 500) + 1; }

export default function CoursePlayer({ course }: { course: Course }) {
  const lessons = useMemo(() => getAllLessons(course), [course]);
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [activeId, setActiveId] = useState(lessons[0]?.id || '');
  const [selected, setSelected] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [message, setMessage] = useState('');

  const active = lessons.find((lesson) => lesson.id === activeId) || lessons[0];
  const activeIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === active?.id));
  const percent = lessons.length ? Math.round((progress.completed.length / lessons.length) * 100) : 0;
  const level = levelFor(progress.xp);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(keyFor(course.id));
      if (saved) setProgress({ ...defaultProgress, ...JSON.parse(saved) });
    } catch {}
  }, [course.id]);

  useEffect(() => {
    try { localStorage.setItem(keyFor(course.id), JSON.stringify(progress)); } catch {}
  }, [course.id, progress]);

  useEffect(() => { setSelected(null); setQuizDone(false); setMessage(''); }, [activeId]);

  const chooseLesson = (lesson: Lesson) => {
    setActiveId(lesson.id); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeLesson = () => {
    if (!active || progress.completed.includes(active.id)) return;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const nextStreak = progress.lastPlayed === yesterday ? progress.streak + 1 : progress.lastPlayed === today ? progress.streak : 1;
    setProgress((p) => ({ ...p, completed: [...p.completed, active.id], xp: p.xp + active.xp, streak: nextStreak, lastPlayed: today }));
    setMessage(`Quest complete! +${active.xp} XP earned.`);
  };

  const answerQuiz = (index: number) => {
    if (!active?.quiz || quizDone) return;
    setSelected(index);
    if (index === active.quiz[0].answer) {
      setQuizDone(true);
      setMessage('Correct! Bonus XP unlocked.');
      if (!progress.completed.includes(active.id)) setProgress((p) => ({ ...p, xp: p.xp + 25 }));
    } else setMessage('Not quite. Read the explanation and try again.');
  };

  const reset = () => { setProgress(defaultProgress); setActiveId(lessons[0]?.id || ''); setMessage('Progress reset. New quest started!'); };
  const allDone = percent === 100;

  return (
    <main className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${course.color} p-7 md:p-10 shadow-2xl`}>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <Link href="/courses" className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"><ChevronLeft className="h-4 w-4" /> All courses</Link>
              <div className="flex items-center gap-4"><span className="text-5xl">{course.icon}</span><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{course.shortTitle}</p><h1 className="mt-1 text-3xl font-semibold md:text-5xl">{course.title}</h1></div></div>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">{course.description}</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-black/15 p-5 backdrop-blur">
              <div className="flex items-center justify-between"><span className="text-sm text-white/70">Quest progress</span><span className="font-semibold">{percent}%</span></div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${percent}%` }} /></div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center"><div><div className="text-xl font-bold">{progress.xp}</div><div className="text-[11px] text-white/60">XP</div></div><div><div className="text-xl font-bold">{level}</div><div className="text-[11px] text-white/60">Level</div></div><div><div className="text-xl font-bold">{progress.streak}</div><div className="text-[11px] text-white/60">Streak</div></div></div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[310px_1fr]">
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-4 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Quest map</h2><button onClick={reset} title="Reset progress" className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"><RotateCcw className="h-4 w-4" /></button></div>
            <div className="space-y-5">
              {course.modules.map((module, mi) => <div key={module.id}><div className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-white/40">{mi + 1}. {module.title}</div><div className="space-y-1">{module.lessons.map((lesson, li) => { const done = progress.completed.includes(lesson.id); const activeLesson = lesson.id === active?.id; return <button key={lesson.id} onClick={() => chooseLesson(lesson)} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${activeLesson ? 'bg-white/15' : 'hover:bg-white/10'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done ? 'bg-emerald-400 text-slate-950' : activeLesson ? 'bg-white text-slate-950' : 'bg-white/10 text-white/60'}`}>{done ? <Check className="h-4 w-4" /> : li + 1}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{lesson.title}</span><span className="text-[11px] text-white/40">{lesson.duration} · +{lesson.xp} XP</span></span>{lesson.type === 'project' && <Trophy className="h-4 w-4 text-amber-300" />}</button>; })}</div></div>)}
            </div>
          </aside>

          <section className="min-w-0">
            {active && <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl md:p-10">
              <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">{active.type === 'project' ? 'Boss fight' : active.type === 'challenge' ? 'Challenge' : 'Lesson'}</span><span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"><Zap className="h-3.5 w-3.5" /> +{active.xp} XP</span></div>
              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">{active.title}</h2>
              <p className="mt-3 text-lg text-slate-600">{active.summary}</p>

              <div className="mt-8 grid gap-4">{active.content.map((item, i) => <div key={item} className="flex gap-4 rounded-2xl bg-slate-50 p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{i + 1}</span><p className="leading-7 text-slate-700">{item}</p></div>)}</div>

              {active.quiz?.length ? <div className="mt-10 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6"><div className="flex items-center gap-2 font-semibold text-indigo-950"><CircleHelp className="h-5 w-5" /> Checkpoint</div><p className="mt-4 font-medium text-slate-900">{active.quiz[0].question}</p><div className="mt-4 grid gap-3">{active.quiz[0].options.map((option, i) => { const correct = i === active.quiz![0].answer; const chosen = i === selected; return <button key={option} onClick={() => answerQuiz(i)} className={`rounded-xl border p-4 text-left transition ${chosen && correct ? 'border-emerald-300 bg-emerald-50' : chosen && !correct ? 'border-rose-300 bg-rose-50' : 'border-white bg-white hover:border-indigo-300'}`}>{option}</button>; })}</div>{selected !== null && <p className="mt-4 text-sm text-slate-600">{active.quiz[0].explanation}</p>}</div> : null}

              {message && <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{message}</div>}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6"><button disabled={activeIndex === 0} onClick={() => chooseLesson(lessons[activeIndex - 1])} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Previous</button><div className="flex gap-3"><button onClick={completeLesson} disabled={progress.completed.includes(active.id)} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:cursor-default disabled:bg-emerald-600"><Check className="h-4 w-4" /> {progress.completed.includes(active.id) ? 'Completed' : 'Complete quest'}</button><button disabled={activeIndex === lessons.length - 1} onClick={() => chooseLesson(lessons[activeIndex + 1])} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Next <ChevronRight className="h-4 w-4" /></button></div></div>
            </div>}

            <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><Flame className="h-5 w-5 text-orange-300" /><p className="mt-3 text-sm text-white/50">Current streak</p><p className="text-2xl font-bold">{progress.streak} days</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><Sparkles className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm text-white/50">XP to next level</p><p className="text-2xl font-bold">{500 - (progress.xp % 500)} XP</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5">{allDone ? <Trophy className="h-5 w-5 text-amber-300" /> : <Lock className="h-5 w-5 text-white/50" />}<p className="mt-3 text-sm text-white/50">Completion badge</p><p className="text-2xl font-bold">{allDone ? 'Unlocked' : 'Locked'}</p></div></div>
          </section>
        </div>
      </div>
    </main>
  );
}
