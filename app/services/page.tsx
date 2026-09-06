import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, Code2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    id: 'basic-foundation',
    number: '01',
    icon: BookOpen,
    title: 'Basic Foundation',
    description: 'Build the core programming, problem-solving, and computer science skills every engineering student needs.',
    features: ['Programming fundamentals', 'Data structures and algorithms', 'OOP, DBMS, SQL, and networks'],
    href: '/courses#foundations',
  },
  {
    id: 'full-stack',
    number: '02',
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Learn to design, build, secure, and deploy production-style web applications from interface to database.',
    features: ['React and Next.js', 'Node.js, APIs, and MongoDB', 'Java Spring Boot and deployment'],
    href: '/courses#full-stack',
  },
  {
    id: 'aiml',
    number: '03',
    icon: BrainCircuit,
    title: 'AI/ML',
    description: 'Move from Python and data foundations to practical machine learning and intelligent product experiences.',
    features: ['Python, NumPy, and Pandas', 'Machine learning and evaluation', 'Deep learning and GenAI applications'],
    href: '/courses#ai-ml',
  },
];

export default function ServicesPage() {
  return <div className="min-h-screen bg-background text-text">
    <Navbar />
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="font-mono text-sm tracking-[0.22em] text-accent-light">VIRTUNEX LEARNING PROGRAMS</p>
          <h1 className="mt-5 text-5xl font-light leading-tight md:text-7xl">Three programs.<br /><span className="text-accent-light">Real capability.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">We focus on three practical engineering paths, designed around fundamentals, real projects, and the skills teams use every day.</p>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {services.map(({ id, number, icon: Icon, title, description, features, href }) => <article id={id} key={id} className="group flex min-h-[430px] flex-col border border-border bg-surface p-7 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-accent/70">
            <div className="flex items-center justify-between"><Icon className="h-8 w-8 text-accent-light" strokeWidth={1.5} /><span className="font-mono text-sm text-muted">{number}</span></div>
            <h2 className="mt-12 text-2xl font-medium">{title}</h2>
            <p className="mt-4 leading-7 text-muted">{description}</p>
            <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-text">{features.map((feature) => <li key={feature} className="flex gap-3"><span className="text-accent-light">+</span>{feature}</li>)}</ul>
            <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-accent-light hover:text-text">Explore program <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </article>)}
        </div>
      </section>
      <section className="border-y border-border bg-surface"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-14 md:flex-row md:items-center md:justify-between"><div><p className="font-mono text-xs tracking-[0.2em] text-accent-light">NEXT STEP</p><h2 className="mt-3 text-3xl font-light">Choose your path and start building.</h2></div><Link href="/internships" className="inline-flex items-center gap-2 bg-jamoon-bright px-5 py-3 font-medium hover:bg-accent">Apply for an internship <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
    <Footer />
  </div>;
}
