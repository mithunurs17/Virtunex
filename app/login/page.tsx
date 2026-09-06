import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth0, isAuth0Configured } from '@/lib/auth0';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  if (isAuth0Configured && await auth0.getSession()) redirect('/dashboard');
  const { returnTo = '/dashboard' } = await searchParams;
  const continueHref = isAuth0Configured ? `/auth/login?returnTo=${encodeURIComponent(returnTo)}` : '/login';
  return <main className="min-h-screen bg-background text-text flex items-center justify-center px-6">
    <section className="w-full max-w-md border border-border bg-surface p-8 shadow-2xl">
      <Image src="/virtunex.png" alt="Virtunex" width={56} height={56} className="mb-8" />
      <p className="text-accent-light text-sm tracking-[0.2em] uppercase">Virtunex</p>
      <h1 className="mt-3 text-4xl font-light">Learn. Build. Level Up.</h1>
      <p className="mt-4 text-muted">Engineering Internship + Gamified Learning + Real Projects</p>
      <Link href={continueHref} className="mt-8 block bg-jamoon-bright px-5 py-3 text-center font-medium hover:bg-accent transition-colors">Continue with Auth0</Link>
      {!isAuth0Configured && <p className="mt-4 border border-amber-800 bg-amber-950/40 p-3 text-sm text-amber-200">Auth0 is not configured on this server. Add the values from .env.example and restart the app.</p>}
      <Link href="/" className="mt-5 block text-center text-sm text-muted hover:text-text">Return home</Link>
    </section>
  </main>;
}
