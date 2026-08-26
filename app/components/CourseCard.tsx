import Link from 'next/link';
import { ArrowRight, Clock3, Trophy, Sparkles } from 'lucide-react';
import type { Course } from '@/lib/courses';

export default function CourseCard({ course }: { course: Course }) {
  const lessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const xp = course.modules.flatMap((module) => module.lessons).reduce((sum, lesson) => sum + lesson.xp, 0);
  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <article className="h-full rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-xl shadow-slate-200/40 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className={`h-40 rounded-[1.5rem] bg-gradient-to-br ${course.color} p-6 text-white relative overflow-hidden`}>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-start justify-between">
            <span className="text-4xl">{course.icon}</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{course.level}</span>
          </div>
          <p className="absolute bottom-5 left-6 text-sm font-medium text-white/80">{course.shortTitle}</p>
        </div>
        <div className="pt-6">
          <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-indigo-700 transition">{course.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2"><Clock3 className="h-3.5 w-3.5" />{course.duration}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2"><Sparkles className="h-3.5 w-3.5" />{lessons} quests</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2"><Trophy className="h-3.5 w-3.5" />{xp} XP</span>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>Start your quest</span><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
