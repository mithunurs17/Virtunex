import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { courses } from '@/lib/courses';
import { Gamepad2, Flame, ShieldCheck, Medal } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#ede9fe,transparent_35%),#f8fafc]">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur"><Gamepad2 className="h-4 w-4" /> Learn like a game. Build like an engineer.</div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">Choose your <span className="text-indigo-600">tech quest.</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Virtunex turns technical learning into a progression system: quests, XP, streaks, checkpoints, projects, badges and a final boss fight.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[['XP', 'Earn points for progress', Flame], ['Badges', 'Unlock milestones', Medal], ['Projects', 'Build portfolio proof', ShieldCheck], ['Levels', 'See your growth', Gamepad2]].map(([label, text, Icon]) => {
              const IconComponent = Icon as typeof Flame;
              return <div key={label as string} className="rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-xl"><IconComponent className="h-5 w-5 text-indigo-600" /><div className="mt-3 font-semibold text-slate-900">{label as string}</div><div className="text-xs text-slate-500">{text as string}</div></div>;
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
