"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (localStorage.getItem('admin_auth') === '1') {
        router.push('/dashboard/admin');
      }
    } catch {}
  }, [router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === 'admin@virtunex.com' && password === 'SuperSecret!123') {
      try { localStorage.setItem('admin_auth', '1'); } catch {}
      router.push('/dashboard/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-10 tracking-tight text-center mt-10">Admin Access</h1>
          <div className="mx-auto w-full max-w-md">
            <form onSubmit={onSubmit} className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <h2 className="text-xl font-medium mb-4 text-slate-900">Sign in to continue</h2>
              <div className="space-y-4">
                <input className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 placeholder:text-slate-500" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 placeholder:text-slate-500" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                {error && <p className="text-rose-600 text-sm">{error}</p>}
                <button type="submit" className="w-full px-5 py-3 rounded-2xl bg-slate-900/90 text-white">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
