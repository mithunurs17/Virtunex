'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure component is hydrated on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <main className="min-h-screen bg-background text-text flex items-center justify-center px-6">
        <section className="w-full max-w-md border border-border bg-surface p-8 shadow-2xl rounded-2xl">
          <div className="h-14 bg-card rounded animate-pulse mb-6" />
          <div className="h-6 bg-card rounded animate-pulse mb-4" />
          <div className="h-4 bg-card rounded animate-pulse mb-8" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text flex items-center justify-center px-6">
      <section className="w-full max-w-md border border-border bg-surface p-8 shadow-2xl rounded-2xl">
        <Image src="/virtunex.png" alt="Virtunex" width={56} height={56} className="mb-6" />
        <p className="text-accent-light text-sm tracking-[0.2em] uppercase">Virtunex</p>
        <h1 className="mt-3 text-4xl font-light">Welcome Back</h1>
        <p className="mt-4 text-muted text-sm">Sign in to your internship dashboard</p>

        {error && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm text-muted mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-5 py-3 bg-jamoon hover:bg-jamoon-bright disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-medium rounded-lg transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link href="/signup" className="text-jamoon hover:text-jamoon-bright transition">
            Sign up
          </Link>
        </p>

        <Link href="/" className="mt-4 block text-center text-sm text-muted hover:text-text transition">
          Return home
        </Link>
      </section>
    </main>
  );
}
