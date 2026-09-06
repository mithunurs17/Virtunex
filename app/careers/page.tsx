import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function CareersPage() {
  const jobs = [
    {
      id: 'technical-coordinator',
      title: 'Technical Coordinator',
      location: 'Bengaluru (On-site/Hybrid)',
      type: 'Full-time',
      experience: '2+ years',
      summary:
        'Coordinate technical projects, align cross-functional teams, and ensure on-time, high-quality delivery for clients.',
      responsibilities: [
        'Own project coordination, timelines, and stakeholder updates',
        'Bridge communication between engineering, design, and business',
        'Track risks, unblock dependencies, and maintain delivery quality',
      ],
      requirements: [
        'Strong communication and coordination skills',
        'Understanding of modern web/mobile stacks',
        'Experience with Agile/Scrum workflows',
      ],
    },
    {
      id: 'technical-trainer',
      title: 'Technical Trainer',
      location: 'Bengaluru (On-site/Hybrid)',
      type: 'Full-time',
      experience: '2+ years',
      summary:
        'Design and deliver hands-on training programs for interns and teams, focusing on real-world, production-grade projects.',
      responsibilities: [
        'Create structured, outcome-driven curriculum and modules',
        'Deliver sessions, mentor learners, and review assignments',
        'Collaborate with engineering teams to align content with practice',
      ],
      requirements: [
        'Expertise in at least one: Web, Mobile, Cloud, or AI/ML',
        'Ability to explain complex topics simply and clearly',
        'Prior training/mentorship experience preferred',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section - Apple Glassy UI */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>

        {/* Subtle floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>

        {/* Glassmorphic grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <span className="text-sm text-slate-700 font-medium tracking-wide">Join Our Team</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            <span>
              Careers at{' '}
              <span className="inline-flex items-baseline gap-2 align-baseline">
                <Image
                  src="/virtunex.png"
                  unoptimized
                  alt="Virtunex logo"
                  width={96}
                  height={96}
                  className="inline-block object-contain align-baseline"
                  style={{ height: '1em', width: 'auto' }}
                />
                <span>Virtunex</span>
              </span>
            </span>
          </h1>
          <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-3xl">
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Build delightful products, mentor future talent, and grow your career with a team that cares about quality.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions - Apple Glassy UI */}
      <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600 font-light">
              To apply,  <span className="font-medium"></span>  email your resume to <span className="font-medium">hr@virtunex.com</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight">
                    {job.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 border border-white/40 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></span>
                    <span className="text-xs font-medium text-slate-600 tracking-wide">Hiring</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-2 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-700 font-medium border border-white/40">
                    {job.location}
                  </span>
                  <span className="px-3 py-2 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-700 font-medium border border-white/40">
                    {job.type}
                  </span>
                  <span className="px-3 py-2 bg-white/70 backdrop-blur-xl rounded-full text-sm text-slate-700 font-medium border border-white/40">
                    Experience: {job.experience}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {job.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 tracking-wide mb-3">
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></span>
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 tracking-wide mb-3">
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></span>
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="inline-block bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-sm border border-white/40">
                  <p className="text-slate-700 text-sm md:text-base text-center">
                    To apply,  <span className="font-medium"></span>  email your resume to <span className="font-medium">hr@virtunex.com</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Apple Glassy UI */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/20 to-slate-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Careers at Virtunex
          </h2>
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/20 max-w-3xl">
            <p className="text-xl text-slate-200 font-light leading-relaxed">
              For applications and queries,  <span className="font-medium"></span>  email your resume to <span className="font-medium">hr@virtunex.com</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
