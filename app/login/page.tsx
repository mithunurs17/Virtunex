'use client';

import { useEffect, useState } from 'react';
import { handleAuthentication } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      handleAuthentication(hash, router);
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % 4), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-600">
      <div className="text-center">
        <div className="animate-pulse">Processing sign-in…</div>
        <div className="mt-2 text-sm">Step {msgIndex + 1} of 4</div>
      </div>
    </div>
  );
}


