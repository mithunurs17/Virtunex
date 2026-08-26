import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section - Apple Glassy UI */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/30 shadow mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-sm text-slate-700 font-medium">Our story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6">
              <span>
                About
                {' '}
                <span className="inline-flex items-baseline gap-2 align-baseline">
                  <Image
                    src="/virtunex.png"
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
            <div className="inline-block bg-white/60 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-white/20 max-w-4xl mx-auto">
              <p className="text-xl text-slate-700 font-medium">
                A forward-thinking technology company by <span className="font-semibold text-slate-900">Liam6 NextGen Technologies</span>, 
                dedicated to empowering businesses and students through innovative solutions and real-world learning opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview - Apple Glassy UI */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow mb-6">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span className="text-sm text-slate-700 font-medium">Est. 2019</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2019, <span className="font-semibold text-slate-900">Virtunex Tech Solution</span> is a proud initiative of 
                  <span className="font-semibold text-slate-900"> Liam6 NextGen Technologies</span>. We&apos;ve been at the forefront of digital transformation, 
                  helping businesses of all sizes leverage technology to achieve their goals.
                </p>
                <p>
                  Our unique approach combines cutting-edge technology solutions with comprehensive internship 
                  programs, creating a win-win ecosystem where businesses get innovative solutions and students 
                  gain invaluable real-world experience.
                </p>
                <p>
                  Today, we're proud to have completed over 50 successful projects and helped more than 25 
                  interns launch their careers in technology, all under the guidance and support of Liam6 NextGen Technologies.
                </p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-slate-900 mb-2">50+</div>
                  <div className="text-slate-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-slate-900 mb-2">100+</div>
                  <div className="text-slate-600 font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-slate-900 mb-2">25+</div>
                  <div className="text-slate-600 font-medium">Interns Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-slate-900 mb-2">5+</div>
                  <div className="text-slate-600 font-medium">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Apple Glassy UI */}
      <section className="py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the leading technology partner that bridges the gap between business innovation and 
                student development, creating a sustainable ecosystem where technology empowers growth and 
                learning drives progress.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To deliver innovative technology solutions that drive business success while providing 
                students with real-world project experience, mentorship, and career opportunities in 
                the technology industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Apple Glassy UI */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/30 shadow mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-sm text-slate-700 font-medium">Core values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Innovation</h3>
              <p className="text-slate-600">
                We constantly explore new technologies and approaches to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Collaboration</h3>
              <p className="text-slate-600">
                We believe in the power of teamwork and partnership to achieve exceptional results.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Learning</h3>
              <p className="text-slate-600">
                We foster a culture of continuous learning and knowledge sharing.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg border border-white/30">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">
                We strive for excellence in everything we do, from code quality to client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture - Apple Glassy UI */}
      <section className="py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/30 shadow mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-sm text-slate-700 font-medium">Our team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Our Team & Culture</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re a diverse team of passionate technologists, educators, and innovators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <h3 className="text-2xl font-medium text-slate-900 mb-6">Diverse Expertise</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our team brings together expertise in web development, mobile apps, cloud computing, 
                artificial intelligence, and cybersecurity. This diversity allows us to tackle complex 
                challenges from multiple angles.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Full-stack developers with modern tech stack expertise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Cloud architects and DevOps engineers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">AI/ML specialists and data scientists</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Cybersecurity experts and consultants</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <h3 className="text-2xl font-medium text-slate-900 mb-6">Mentorship Culture</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We believe in the power of mentorship and knowledge sharing. Our experienced team members 
                actively mentor interns and junior developers, creating a supportive learning environment.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">One-on-one mentorship programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Code review and pair programming sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Regular knowledge sharing workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-600">Career development guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
