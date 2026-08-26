'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-lg border border-white/30 bg-white/80 backdrop-blur-md">
              <Image src="/virtunex.png" alt="Virtunex" fill className="object-contain p-1.5" />
            </div>
            <span className="text-2xl font-light text-slate-900">Virtunex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/services" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Services
            </Link>
            <Link href="/courses" className="text-indigo-700 hover:text-indigo-900 transition-colors font-semibold">
              Learn
            </Link>
            <Link href="/internships" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Internships
            </Link>
            <Link href="/careers" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Careers
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/courses"
              className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl hover:bg-slate-900 transition-all duration-500 font-medium shadow-lg border border-slate-800/20"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-slate-900 focus:outline-none p-2 rounded-xl hover:bg-white/60 backdrop-blur-md transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-xl rounded-b-2xl">
              <Link href="/" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                Services
              </Link>
              <Link href="/courses" className="block px-3 py-2 text-indigo-700 hover:text-indigo-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-semibold">
                Learn / Courses
              </Link>
              <Link href="/internships" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                Internships
              </Link>
              <Link href="/careers" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                Careers
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 backdrop-blur-md rounded-xl transition-all duration-300 font-medium">
                Contact
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-3 bg-slate-900/90 backdrop-blur-md text-white rounded-2xl mx-3 mt-4 text-center font-medium shadow-lg border border-slate-800/20 transition-all duration-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
