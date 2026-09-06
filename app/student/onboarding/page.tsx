import { redirect } from 'next/navigation';
import { requireStudent } from '@/lib/permissions';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';
import OnboardingForm from './OnboardingForm';

export const dynamic = 'force-dynamic';
export default async function StudentOnboardingPage() {
  const user = await requireStudent().catch(() => null);
  if (!user) redirect('/login');
  await dbConnect();
  const profile = await StudentProfileModel.findOne({ userId: user._id }).lean();
  if (profile?.onboardingCompleted) redirect('/dashboard');
  return <main className="min-h-screen bg-background px-5 pb-16 pt-28 text-text"><div className="mx-auto max-w-3xl"><p className="text-sm uppercase tracking-[0.2em] text-accent-light">Student profile</p><h1 className="mt-3 text-4xl font-light">Build your learning profile</h1><p className="mt-3 text-muted">A few details help us shape your path at Virtunex.</p><OnboardingForm initialName={user.fullName || ''} /></div></main>;
}
