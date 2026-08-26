'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@virtunex.com';
const ADMIN_PASSWORD = 'SuperSecret!123';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', '1');
      router.push('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 w-full max-w-md">
        <h1 className="text-2xl font-light text-slate-900 mb-4">Admin Login</h1>
        <div className="space-y-4">
          <input className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {error && <p className="text-rose-600 text-sm mt-3">{error}</p>}
        <button type="submit" className="mt-6 w-full bg-slate-900/90 text-white px-4 py-3 rounded-2xl">Login</button>
      </form>
    </div>
  );
}


