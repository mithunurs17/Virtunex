import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TestimonialCarousel from './components/TestimonialCarousel';
import StatCounter from './components/StatCounter';
import StatCard from './components/StatCard';
import ServiceCard from './components/ServiceCard';
import Link from 'next/link';
import Image from 'next/image';
import { Search, FileText, Zap, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section - Apple Glassy UI with Engaging Animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        
        {/* Glassmorphic grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - Typography Focused */}
            <div className="text-left space-y-8">
              {/* Main heading */}
              <div className="space-y-4 animate-fadeInUp sm:mt-0 mt-10">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-slate-900 leading-[0.9]">
                  <span className="inline-flex items-baseline gap-3">
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
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-medium text-slate-600 mt-2">Tech Solution</span>
                </h1>
                
                {/* Glassy subtitle */}
                <div className="inline-block bg-white/60 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/20">
                  <p className="text-lg md:text-xl text-slate-700 font-medium">
                    Empowering Businesses & Students with Technology
                  </p>
                </div>
              </div>

              {/* Glassy stats cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { end: 50, label: "Projects" },
                  { end: 100, label: "Clients" },
                  { end: 25, label: "Interns" }
                ].map((stat, index) => (
                  <StatCard key={index} end={stat.end} label={stat.label} />
                ))}
              </div>

              {/* Glassy CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative bg-white/80 backdrop-blur-md text-slate-900 px-8 py-4 rounded-2xl shadow-lg border border-white/20 hover:bg-white/90 hover:-translate-y-1 transition-all duration-500 font-medium"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get in Touch
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/internships"
                  className="group relative bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-500 font-medium"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Apply for Internship
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Content - Glassy Image Display */}
            <div className="relative">
              {/* Main hero image with glassy frame */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-2 shadow-2xl border border-white/30">
                  <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
        <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                      alt="Modern office workspace with technology"
                      fill
                      className="object-cover"
          priority
        />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Floating glassy cards */}
              <div className="absolute -top-8 -left-8 z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/30 hover:bg-white/90 hover:-translate-y-2 transition-all ">
                  <div className="relative w-32 h-24 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Team collaboration"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-slate-700">Team Work</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/30 hover:bg-white/90 hover:-translate-y-2 transition-all" >
                  <div className="relative w-32 h-24 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Coding and development"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-slate-700">Development</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/4 -right-12 z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/30 hover:bg-white/90 hover:-translate-y-2 transition-all " >
                  <div className="relative w-32 h-24 rounded-xl overflow-hidden">
            <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Data analytics"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-slate-700">Analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border border-slate-400/30 rounded-full flex justify-center backdrop-blur-md bg-white/20">
            <div className="w-1 h-3 bg-slate-400/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Highlights - Apple Glossy Design */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Apple-style subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-slate-50/40 to-blue-50/20"></div>
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100/8 to-purple-200/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-slate-100/5 to-blue-100/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-600"></div>
              <span className="text-sm text-slate-700 font-medium tracking-wide">Our expertise</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
              Our Services
            </h2>
            <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-2xl">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Comprehensive IT solutions with modern design, performance, and scalability
              </p>
            </div>
          </div>
          
                    <div className="flex px-2 pt-2 pb-10 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 scrollbar-hide">
            {[
              {
                title: "Web Development",
                description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                imageAlt: "Web development UI on laptop",
                tags: ["React", "Next.js", "Node.js"],
                href: "/services#web"
              },
              {
                title: "Mobile App Development",
                description: "Native and cross-platform mobile applications for iOS and Android.",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                imageAlt: "Mobile app UI on smartphone",
                tags: ["React Native", "Flutter", "Swift"],
                href: "/services#mobile"
              },
              {
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and migration services.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
                imageAlt: "Cloud infrastructure",
                tags: ["AWS", "Azure", "GCP"],
                href: "/services#cloud"
              },
              {
                title: "AI/ML Solutions",
                description: "Intelligent automation and machine learning for your business.",
                image: "https://plus.unsplash.com/premium_photo-1682689573748-0b8996ed42f2?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                imageAlt: "AI and machine learning visual",
                tags: ["TensorFlow", "PyTorch", "AWS"],
                href: "/services#ai"
              },
              {
                title: "Cybersecurity",
                description: "Protect your digital assets with advanced threat detection.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                imageAlt: "Cybersecurity shield",
                tags: ["Penetration Testing", "SOC", "Compliance"],
                href: "/services#cybersecurity"
              },
              {
                title: "IT Consulting",
                description: "Strategic technology consulting to guide decisions and roadmaps.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
                imageAlt: "Consulting discussion",
                tags: ["Strategy", "Architecture", "Planning"],
                href: "/services#consulting"
              }
            ].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Internship Programs Journey - Apple Glassy UI */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 mb-6 md:mb-8 tracking-tight">
              Internship Journey
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-block bg-white/70 backdrop-blur-xl rounded-2xl px-8 md:px-10 py-4 md:py-5 shadow-sm border border-white/40">
                <p className="text-lg md:text-xl text-slate-700 font-light leading-relaxed">
                  Embark on a transformative journey from student to a professional
                </p>
              </div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-xl rounded-2xl px-6 md:px-8 py-3 md:py-4 shadow-sm border border-green-200/40">
                <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                <span className="text-sm md:text-base font-medium text-green-800 tracking-wide">
                  VTU Recognized & VTU Colleges Recognized Internship Certificates
                </span>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Timeline line - Desktop centered, Mobile left-aligned */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300/50 via-indigo-300/50 to-purple-300/50 hidden lg:block"></div>
            <div className="absolute left-4 lg:hidden w-1 h-full bg-gradient-to-b from-blue-300/50 via-indigo-300/50 to-purple-300/50"></div>
            
            <div className="space-y-8 md:space-y-10">
              {/* Step 1: Application & Onboarding */}
              <div className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-6">
                <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right pl-12 lg:pl-0">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-2xl mb-4 md:mb-5 shadow-lg border border-white/30">
                      <span className="text-slate-700 font-medium text-lg md:text-xl">1</span>
                    </div>
                    <h3 className="text-xl md:text-xl font-medium text-slate-900 mb-3 md:mb-4">Application & Onboarding</h3>
                    <p className="text-sm md:text-sm text-slate-600 mb-4 md:mb-5 leading-relaxed">
                      Start your journey by applying to our internship program. We&apos;ll assess your skills and match you with the perfect team.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Skill assessment & interview</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Team matching & project assignment</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Development environment setup</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot - Desktop centered, Mobile left-aligned */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg hidden lg:block"></div>
                <div className="absolute left-0 lg:hidden w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
                
                <div className="w-full lg:w-1/2 lg:pl-8"></div>
              </div>

              {/* Step 2: Learning & Development */}
              <div className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-6">
                <div className="w-full lg:w-1/2 lg:pr-8"></div>
                
                {/* Timeline dot - Desktop centered, Mobile left-aligned */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg hidden lg:block"></div>
                <div className="absolute left-0 lg:hidden w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
                
                <div className="lg:w-1/2 lg:pl-8 pl-12">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-2xl mb-4 md:mb-5 shadow-lg border border-white/30">
                      <span className="text-slate-700 font-medium text-lg md:text-xl">2</span>
                    </div>
                    <h3 className="text-xl md:text-xl font-medium text-slate-900 mb-3 md:mb-4">Learning & Development</h3>
                    <p className="text-sm md:text-sm text-slate-600 mb-4 md:mb-5 leading-relaxed">
                      Work on real-world live projects that are deployed to the world, gaining hands-on experience with production-level code.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Live projects deployed to the world</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Production-level code experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">1-on-1 mentorship & code reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Growth & Certification */}
              <div className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-6">
                <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right pl-12 lg:pl-0">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-2xl mb-4 md:mb-5 shadow-lg border border-white/30">
                      <span className="text-slate-700 font-medium text-lg md:text-xl">3</span>
                    </div>
                    <h3 className="text-xl md:text-xl font-medium text-slate-900 mb-3 md:mb-4">Growth & Certification</h3>
                    <p className="text-sm md:text-sm text-slate-600 mb-4 md:mb-5 leading-relaxed">
                      Build a portfolio of live projects that are deployed and used by real users, earn VTU-recognized certifications.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">VTU & VTU Colleges recognized certificates</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Portfolio of live deployed projects</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Industry-standard soft skills training</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot - Desktop centered, Mobile left-aligned */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg hidden lg:block"></div>
                <div className="absolute left-0 lg:hidden w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
                
                <div className="w-full lg:w-1/2 lg:pl-8"></div>
              </div>

              {/* Step 4: Career Launch */}
              <div className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-6">
                <div className="w-full lg:w-1/2 lg:pr-8"></div>
                
                {/* Timeline dot - Desktop centered, Mobile left-aligned */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg hidden lg:block"></div>
                <div className="absolute left-0 lg:hidden w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
                
                <div className="lg:w-1/2 lg:pl-8 pl-12">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-2xl mb-4 md:mb-5 shadow-lg border border-white/30">
                      <span className="text-slate-700 font-medium text-lg md:text-xl">4</span>
                    </div>
                    <h3 className="text-xl md:text-xl font-medium text-slate-900 mb-3 md:mb-4">Career Launch</h3>
                    <p className="text-sm md:text-sm text-slate-600 mb-4 md:mb-5 leading-relaxed">
                      Graduate with real-world project experience, VTU-recognized certificates, and understanding of production software.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Real-world project experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">VTU-recognized internship certificates</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-600">Industry networking & job opportunities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 md:mt-20">
            <Link
              href="/internships"
              className="bg-slate-900/90 backdrop-blur-md text-white px-10 py-4 rounded-2xl hover:bg-slate-900 transition-all duration-500 font-medium shadow-lg border border-slate-800/20 inline-flex items-center"
            >
              Start Your Journey
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Process & Methodology Section - Apple Glassy UI */}
      <section className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <span className="text-sm text-slate-700 font-medium tracking-wide">Our Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              Proven Methodology
            </h2>
            <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-3xl">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Our systematic approach ensures consistent quality and successful project delivery
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your business needs, goals, and technical requirements through comprehensive analysis.",
                icon: Search
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating detailed project roadmap, architecture design, and resource allocation strategy.",
                icon: FileText
              },
              {
                step: "03",
                title: "Development",
                description: "Agile development process with regular milestones, testing, and stakeholder feedback.",
                icon: Zap
              },
              {
                step: "04",
                title: "Deployment",
                description: "Seamless deployment with monitoring, support, and continuous improvement strategies.",
                icon: Rocket
              }
            ].map((process, index) => {
              const IconComponent = process.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-6 text-slate-700 border border-slate-200/50">
                      <IconComponent size={28} />
                    </div>
                    <div className="absolute top-4 right-4 text-4xl font-light text-slate-300">{process.step}</div>
                    <h3 className="text-xl font-medium text-slate-900 mb-4">{process.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


          {/* Call to Action */}
          <div className="bg-white  text-center py-16">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                                 Let&apos;s discuss how our innovative solutions can drive your digital transformation and create lasting competitive advantages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl hover:bg-slate-900 transition-all duration-500 font-medium shadow-lg border border-slate-800/20 inline-flex items-center"
                >
                  Schedule a Consultation
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="bg-white/80 backdrop-blur-md text-slate-900 px-8 py-4 rounded-2xl hover:bg-white transition-all duration-500 font-medium shadow-lg border border-white/30 inline-flex items-center"
                >
                  Explore Our Services
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

      {/* Clients Testimonials - Latest Apple Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-blue-50/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <span className="text-sm text-slate-700 font-medium tracking-wide">Client Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
              What Our Clients Say
            </h2>
            <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-3xl">
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Discover how we&apos;ve transformed businesses and launched careers through innovative solutions and real-world experience
              </p>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <TestimonialCarousel />
        </div>
      </section>

      {/* Stats Section - Apple Glassy UI */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/20 to-slate-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-500 text-center">
              <div className="text-4xl md:text-5xl font-light mb-3 text-white">50+</div>
              <div className="text-slate-300 font-medium">Projects Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-500 text-center">
              <div className="text-4xl md:text-5xl font-light mb-3 text-white">100+</div>
              <div className="text-slate-300 font-medium">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-500 text-center">
              <div className="text-4xl md:text-5xl font-light mb-3 text-white">25+</div>
              <div className="text-slate-300 font-medium">Interns Placed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-500 text-center">
              <div className="text-4xl md:text-5xl font-light mb-3 text-white">5+</div>
              <div className="text-slate-300 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamified Learning CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200">🎮 Virtunex Learning Arena</span>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Stop watching tutorials. Start completing quests.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">Learn Java, Python, C++, DSA, DBMS, SQL, Full Stack and AI/ML through XP, streaks, challenges, projects, checkpoints and badges.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 font-semibold text-slate-950 shadow-xl transition hover:-translate-y-1">Explore Courses →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
