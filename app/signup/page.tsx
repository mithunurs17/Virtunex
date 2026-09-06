'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First and last name are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Signup failed');
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text flex items-center justify-center px-6 py-8">
      <section className="w-full max-w-md border border-border bg-surface p-8 shadow-2xl rounded-2xl">
        <Image src="/virtunex.png" alt="Virtunex" width={56} height={56} className="mb-6" />
        <p className="text-accent-light text-sm tracking-[0.2em] uppercase">Virtunex</p>
        <h1 className="mt-3 text-4xl font-light">Join Us</h1>
        <p className="mt-4 text-muted text-sm">Create your account to start your internship journey</p>

        {error && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon transition"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-jamoon hover:text-jamoon-bright transition">
            Sign in
          </Link>
        </p>

        <Link href="/" className="mt-4 block text-center text-sm text-muted hover:text-text transition">
          Return home
        </Link>
      </section>
    </main>
  );
}
