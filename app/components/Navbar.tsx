'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, UserRound } from 'lucide-react';

type Role = 'STUDENT' | 'MENTOR' | 'ADMIN';
type AppUser = { role: Role; profileImage?: string; fullName?: string };
const publicLinks = [['Home', '/'], ['Programs', '/courses'], ['Internships', '/internships'], ['About', '/about'], ['Contact', '/contact']];
const roleLinks: Record<Role, string[][]> = {
  STUDENT: [['Dashboard', '/dashboard'], ['Learn', '/courses'], ['Internship', '/internships'], ['Challenges', '/courses'], ['Projects', '/courses'], ['Leaderboard', '/courses'], ['Achievements', '/courses'], ['Profile', '/student/onboarding']],
  MENTOR: [['Dashboard', '/dashboard'], ['Students', '/mentor/students'], ['Assignments', '/mentor/assignments'], ['Projects', '/mentor/projects'], ['Evaluations', '/mentor/evaluations'], ['Profile', '/mentor/profile']],
  ADMIN: [['Dashboard', '/dashboard/admin'], ['Students', '/admin'], ['Mentors', '/admin'], ['Programs', '/courses'], ['Batches', '/dashboard/admin#batches'], ['Courses', '/courses'], ['Projects', '/dashboard/admin#projects'], ['Certificates', '/dashboard/admin'], ['Analytics', '/dashboard/admin'], ['Settings', '/dashboard/admin#settings']],
};

export default function Navbar() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { fetch('/api/users/me').then((r) => r.ok ? r.json() : null).then((data) => setUser(data?.user || null)).catch(() => setUser(null)); }, []);
  const links = user ? roleLinks[user.role] : publicLinks;
  return <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
      <Link href="/" className="flex items-center gap-3 text-text"><Image src="/virtunex.png" alt="Virtunex" width={34} height={34} unoptimized /><span className="text-xl tracking-wide">Virtunex</span></Link>
      <div className="hidden items-center gap-5 md:flex">{links.map(([label, href]) => <Link key={label} href={href} className="text-sm text-muted transition-colors hover:text-accent-light">{label}</Link>)}{user ? <Link href="/dashboard" aria-label="Profile"><Image src={user.profileImage || '/virtunex.png'} alt={user.fullName || 'Profile'} width={32} height={32} unoptimized className="h-8 w-8 rounded-full border border-border object-cover" /></Link> : <Link href="/login" className="bg-jamoon-bright px-4 py-2 text-sm text-text hover:bg-accent">Get Started</Link>}</div>
      <button className="p-2 text-text md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-border bg-surface px-5 py-4 md:hidden">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="flex items-center gap-3 border-b border-border/60 py-3 text-sm text-muted hover:text-accent-light"><UserRound size={15} />{label}</Link>)}{!user && <Link href="/login" className="mt-4 block bg-jamoon-bright px-4 py-3 text-center text-sm">Get Started</Link>}</div>}
  </nav>;
}
