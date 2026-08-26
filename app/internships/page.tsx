import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Code, Smartphone, Cloud, Brain, Check, Shield, Trophy } from 'lucide-react';
import Link from 'next/link';
import OnboardingWizardClient from '../components/OnboardingWizardClient';

export default function InternshipsPage() {
  const tracks = [
    {
      id: 'web',
      title: 'Web Development',
      icon: Code,
      description: 'Build responsive, production-grade web apps with modern stacks.',
      topics: ['React / Next.js', 'TypeScript', 'Node.js', 'API Design'],
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      description: 'Create polished iOS and Android apps with best practices.',
      topics: ['React Native', 'Flutter', 'Native Modules', 'Testing'],
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      icon: Cloud,
      description: 'Ship reliably with IaC, CI/CD and cloud-native patterns.',
      topics: ['AWS / GCP', 'Docker / K8s', 'Terraform', 'Observability'],
    },
    {
      id: 'ai',
      title: 'AI / ML',
      icon: Brain,
      description: 'Deliver real AI value using modern frameworks and tooling.',
      topics: ['Python', 'TensorFlow / PyTorch', 'LLMs', 'MLOps'],
    },
  ];

  const projects = [
    {
      title: 'SaaS Analytics Dashboard',
      image: 'https://plus.unsplash.com/premium_photo-1678565999588-08fdd0b1410b?q=80&w=2194&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['Live Project', 'Deployed', 'Next.js'],
    },
    {
      title: 'Mobile Commerce App',
      image: 'https://plus.unsplash.com/premium_photo-1661328125564-13247b14f9bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['Production', 'React Native'],
    },
    {
      title: 'Cloud Infra Automation',
      image: 'https://plus.unsplash.com/premium_photo-1683836722608-60ab4d1b58e5?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tags: ['IaC', 'Kubernetes', 'AWS'],
    },
  ];

  const journey = [
    {
      step: '01',
      title: 'Application & Onboarding',
      points: ['Profile review & alignment', 'Track selection & kick-off'],
    },
    {
      step: '02',
      title: 'Foundation & Mentorship',
      points: ['Guided modules', 'Weekly mentor syncs'],
    },
    {
      step: '03',
      title: 'Real-World Project',
      points: ['Work on live codebases', 'Reviews & QA gates'],
    },
    {
      step: '04',
      title: 'Deployment & Certificate',
      points: ['Ship to production', 'VTU Recognized Certificate'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero - Apple Glassy UI */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <div className="mx-auto mb-3 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md border border-white/30 shadow-lg overflow-hidden">
            <Image src="/virtunex.png" alt="Virtunex" width={44} height={44} className="object-contain p-1.5" />
          </div>
        
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">
            VTU Recognized Internship
          </h1>
          <div className="inline-flex flex-wrap gap-2 justify-center mb-6">
            <span className="px-3 py-1.5 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-800 font-medium border border-white/40 inline-flex items-center gap-2">
              <Shield size={16} /> VTU Recognized Certificate
            </span>
            <span className="px-3 py-1.5 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-800 font-medium border border-white/40 inline-flex items-center gap-2">
              <Trophy size={16} /> Real-World Projects
            </span>
            <span className="px-3 py-1.5 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-800 font-medium border border-white/40 inline-flex items-center gap-2">
              <Check size={16} /> Mentor-led Learning
            </span>
          </div>
          <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-sm border border-white/30 max-w-3xl">
            <p className="text-base md:text-lg text-slate-600 font-light leading-normal">
              Learn by building. Work on live products and ship to production with guidance from experienced mentors.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding & Login */}
      <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Get Started</h2>
                <p className="text-lg text-slate-600 font-light">Complete onboarding to reserve your slot.</p>
              </div>
              <OnboardingWizardClient />
            </div>
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
                <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">Already registered?</h3>
                <p className="text-slate-600 mb-4">Log in to your dashboard to view your batch and progress.</p>
                <Link href="/dashboard/candidate" className="group relative bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 hover:-translate-y-0.5 transition-all duration-300 font-medium inline-flex items-center">
                  <span className="relative z-10 flex items-center justify-center">
                    Go to Dashboard
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
                <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">Need help?</h3>
                <p className="text-slate-600">Email <span className="font-medium">hr@virtunex.com</span> or WhatsApp <span className="font-medium">+91 90000 00000</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Choose Your Track</h2>
            <p className="text-lg text-slate-600 font-light">Industry-aligned curricula with hands-on, outcome-driven learning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div key={track.id} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-5 text-slate-700 border border-slate-200/50">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">{track.title}</h3>
                  <p className="text-slate-600 mb-4">{track.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {track.topics.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/70 backdrop-blur-xl rounded-full text-xs text-slate-700 font-medium border border-white/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-World Projects Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-blue-50/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <span className="text-sm text-slate-700 font-medium tracking-wide">Real-World Experience</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Build What Matters</h2>
            <p className="text-lg text-slate-600 font-light">Projects deployed to real users, under real constraints, with real feedback.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/70 backdrop-blur-xl rounded-full text-xs text-slate-700 font-medium border border-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Internship Journey</h2>
            <p className="text-lg text-slate-600 font-light">A guided path from onboarding to deployment and certification.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {journey.map((j, i) => (
              <div key={i} className="relative">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-4 right-4 text-4xl font-light text-slate-300">{j.step}</div>
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{j.title}</h3>
                  <ul className="space-y-2">
                    {j.points.map((pt) => (
                      <li key={pt} className="flex items-start">
                        <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></div>
                        <span className="text-slate-600">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Why This Internship</h2>
            <p className="text-lg text-slate-600 font-light">Designed to maximize practical skills, portfolio strength, and employability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[{
              title: 'Mentor-Led Learning',
              desc: 'Structured guidance, code reviews, and regular feedback loops.',
            }, {
              title: 'Production Exposure',
              desc: 'Work on code that ships, with deployment and monitoring.',
            }, {
              title: 'Career Ready',
              desc: 'Portfolio projects and VTU recognized certificate.',
            }].map((b) => (
              <div key={b.title} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">{b.title}</h3>
                <p className="text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Info */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/20 to-slate-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">Apply for the Internship</h2>
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/20 max-w-3xl">
            <p className="text-xl text-slate-200 font-light leading-relaxed">
              To apply, email your resume to <span className="font-medium">hr@virtunex.com</span>. Mention your preferred track in the subject line.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
