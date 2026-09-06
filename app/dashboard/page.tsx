import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/permissions';

export default async function DashboardPage() {
  const user = await requireAuth().catch(() => null);
  if (!user) redirect('/login');
  if (user.role === 'ADMIN') redirect('/dashboard/admin');
  if (user.role === 'STUDENT') redirect('/student/onboarding');
  redirect('/');
}
