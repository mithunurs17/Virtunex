import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ContactPage() {
  const whatsappNumber = '+91 90000 00000';
  const whatsappLink = 'https://wa.me/919000000000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero - Apple Glassy UI */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/40 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <span className="text-sm text-slate-700 font-medium tracking-wide">Get in touch</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            <span>
              Contact{' '}
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
          <div className="inline-block bg-white/60 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/30 max-w-3xl">
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              We&apos;d love to hear from you. Reach us on WhatsApp or email and we&apos;ll get back shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contacts */}
      <section className="py-16 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <h3 className="text-xl font-medium text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-600 mb-4">Chat with us on WhatsApp.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-medium underline underline-offset-4">
                {whatsappNumber}
              </a>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <h3 className="text-xl font-medium text-slate-900 mb-2">General</h3>
              <p className="text-slate-600 mb-4">Questions, partnerships, or support.</p>
              <p className="text-slate-800 font-medium">contact@virtunex.com</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-500">
              <h3 className="text-xl font-medium text-slate-900 mb-2">Careers</h3>
              <p className="text-slate-600 mb-4">Apply or ask about openings.</p>
              <p className="text-slate-800 font-medium">hr@virtunex.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact (no form) */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-blue-50/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-center mb-10">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight">Let&apos;s talk</h2>
            <p className="text-lg text-slate-600 font-light">Prefer messaging? Reach us instantly on WhatsApp or via email.</p>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group relative bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-500 font-medium inline-flex items-center">
              <span className="relative z-10 flex items-center justify-center">
                Chat on WhatsApp ({whatsappNumber})
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <div className="inline-block bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-sm border border-white/40">
              <p className="text-slate-700 text-sm md:text-base">
                Or email us at <span className="font-medium">contact@virtunex.com</span> or <span className="font-medium">hr@virtunex.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/30 to-slate-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/20 to-slate-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">We&apos;re just a message away</h2>
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-sm border border-white/20 max-w-3xl">
            <p className="text-slate-200">WhatsApp: <span className="font-medium">{whatsappNumber}</span> • Email: <span className="font-medium">contact@virtunex.com</span> / <span className="font-medium">hr@virtunex.com</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
