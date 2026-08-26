import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Search, FileText, Zap, Rocket } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'web',
      title: 'Web Development',
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Web development UI on laptop",
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      features: [
        'Responsive design for all devices',
        'Modern frameworks (React, Next.js, Vue.js)',
        'E-commerce solutions',
        'Content Management Systems',
        'Progressive Web Apps (PWA)',
        'API development and integration'
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Mobile app UI on smartphone",
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: [
        'Native iOS and Android development',
        'Cross-platform solutions (React Native, Flutter)',
        'App store optimization',
        'Push notifications and analytics',
        'Offline functionality',
        'Third-party integrations'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS']
    },
    {
      id: 'cloud',
      title: 'Cloud Solutions',
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Cloud infrastructure",
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      features: [
        'Cloud migration and strategy',
        'Infrastructure as Code (IaC)',
        'Serverless architecture',
        'Container orchestration (Kubernetes)',
        'Multi-cloud solutions',
        'Cost optimization'
      ],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform']
    },
    {
      id: 'ai',
      title: 'AI/ML Solutions',
      image: "https://plus.unsplash.com/premium_photo-1682689573748-0b8996ed42f2?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "AI and machine learning visual",
      description: 'Intelligent automation and machine learning solutions to optimize your business processes.',
      features: [
        'Custom AI model development',
        'Natural Language Processing (NLP)',
        'Computer Vision solutions',
        'Predictive analytics',
        'Chatbot development',
        'Data pipeline automation'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI', 'Hugging Face']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Cybersecurity shield",
      description: 'Comprehensive security solutions to protect your digital assets and data.',
      features: [
        'Security audits and assessments',
        'Penetration testing',
        'Security architecture design',
        'Compliance consulting (GDPR, HIPAA)',
        'Incident response planning',
        'Security awareness training'
      ],
      technologies: ['OWASP', 'NIST', 'ISO 27001', 'Burp Suite', 'Metasploit', 'Wireshark']
    },
    {
      id: 'consulting',
      title: 'IT Consulting',
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
      imageAlt: "Consulting discussion",
      description: 'Strategic technology consulting to help you make informed decisions for your business.',
      features: [
        'Technology strategy and roadmap',
        'Digital transformation consulting',
        'Technology stack evaluation',
        'Project management and planning',
        'Team augmentation services',
        'Performance optimization'
      ],
      technologies: ['Agile', 'Scrum', 'DevOps', 'CI/CD', 'Microservices', 'API Design']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section - Apple Glassy UI */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        
        {/* Glassmorphic grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <span className="text-sm text-slate-700 font-medium tracking-wide">What We Offer</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Our Services
          </h1>
          <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-3xl">
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Comprehensive IT solutions designed to drive your business forward and help you stay ahead in the digital landscape
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Apple Glassy UI */}
      <section className="py-24 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100/80 backdrop-blur-sm rounded-3xl mb-8 text-slate-700 shadow-lg border border-slate-200/50">
                    <span className="text-2xl font-medium">{service.title.charAt(0)}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">{service.title}</h2>
                  <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-sm border border-white/30 mb-8">
                    <p className="text-lg text-slate-600 font-light leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-slate-900 mb-4">Key Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-slate-900 mb-4">Technologies:</h3>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-full text-sm text-slate-700 font-medium border border-slate-200/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="group relative bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-500 font-medium inline-flex items-center"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Get Started
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-slate-900">{service.title}</h3>
                        <span className="px-3 py-1 bg-slate-100/80 backdrop-blur-sm rounded-full text-sm text-slate-700 font-medium border border-slate-200/50">
                          Professional Service
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Apple Glassy UI */}
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
                We follow a proven methodology to deliver exceptional results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We start by understanding your business needs, goals, and technical requirements.",
                icon: Search,
                color: "from-slate-500 to-slate-600"
              },
              {
                step: "02",
                title: "Planning",
                description: "We create a detailed project plan with timelines, milestones, and deliverables.",
                icon: FileText,
                color: "from-slate-500 to-slate-600"
              },
              {
                step: "03",
                title: "Development",
                description: "Our team builds your solution using agile methodologies and best practices.",
                icon: Zap,
                color: "from-slate-500 to-slate-600"
              },
              {
                step: "04",
                title: "Launch",
                description: "We deploy your solution and provide ongoing support and maintenance.",
                icon: Rocket,
                color: "from-slate-500 to-slate-600"
              }
            ].map((process, index) => {
              const IconComponent = process.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${process.color} rounded-2xl mb-6 text-white`}>
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

      {/* CTA Section - Apple Glassy UI */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/20 to-slate-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/20 max-w-3xl mb-12">
            <p className="text-xl text-slate-200 font-light leading-relaxed">
              Let&apos;s discuss how our services can help transform your business and achieve your goals.
            </p>
          </div>
                     <div className="flex justify-center">
             <Link
               href="/contact"
               className="group relative bg-white/90 backdrop-blur-md text-slate-900 px-8 py-4 rounded-2xl shadow-lg border border-white/20 hover:bg-white hover:-translate-y-1 transition-all duration-500 font-medium inline-flex items-center"
             >
               <span className="relative z-10 flex items-center justify-center">
                 Get a Free Consultation
                 <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                 </svg>
               </span>
             </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
