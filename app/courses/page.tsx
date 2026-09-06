import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { courses } from '@/lib/courses';
import { Gamepad2, Flame, ShieldCheck, Medal } from 'lucide-react';
import { getSession } from '@/lib/auth/session';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';

const internships = [
  { title: 'Basic Foundation', description: 'Build responsive production-grade websites and web applications with modern frontend and backend tools.', icon: 'BASE', duration: '8-10 weeks', courseId: 'foundations' },
  { title: 'Full Stack Development', description: 'Create polished mobile products, connect real APIs, and learn the delivery practices used by product teams.', icon: 'DEV', duration: '8-10 weeks', courseId: 'full-stack' },
  { title: 'AI/ML', description: 'Ship reliable services with deployment workflows, infrastructure fundamentals, observability, and automation.', icon: 'AI', duration: '8-10 weeks', courseId: 'ai-ml' },
];

async function isRegisteredStudent() {
  const session = await getSession();
  if (!session.user) return false;
  await dbConnect();
  return Boolean(await StudentProfileModel.exists({ userId: session.user._id }));
}

export default async function CoursesPage() {
  const registered = await isRegisteredStudent();
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm font-semibold text-accent-light"><Gamepad2 className="h-4 w-4" /> Three internships. One clear path forward.</div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text md:text-7xl">Choose your <span className="text-accent-light">internship.</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">Select one of our three engineering internships. Learning quests, XP, badges, and project work unlock after student registration.</p>
          </div>

          {registered && <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[['XP', 'Earn points for progress', Flame], ['Badges', 'Unlock milestones', Medal], ['Projects', 'Build portfolio proof', ShieldCheck], ['Levels', 'See your growth', Gamepad2]].map(([label, text, Icon]) => {
              const IconComponent = Icon as typeof Flame;
              return <div key={label as string} className="border border-border bg-card p-4"><IconComponent className="h-5 w-5 text-accent-light" /><div className="mt-3 font-semibold text-text">{label as string}</div><div className="text-xs text-muted">{text as string}</div></div>;
            })}
          </div>}

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {internships.map((internship) => <article key={internship.title} className="border border-border bg-surface p-7 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between"><span className="font-mono text-sm tracking-[0.2em] text-accent-light">{internship.icon}</span><span className="text-xs text-muted">{internship.duration}</span></div>
              <h2 className="mt-10 text-2xl font-semibold text-text">{internship.title}</h2>
              <p className="mt-4 min-h-24 text-sm leading-6 text-muted">{internship.description}</p>
              {registered ? <CourseCard course={courses.find((course) => course.id === internship.courseId)!} /> : <div className="mt-7 border-t border-border pt-5 text-sm text-muted">Register as a student to unlock the learning path, XP, and projects.</div>}
            </article>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
