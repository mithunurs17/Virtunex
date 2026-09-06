import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/permissions';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';

export default async function DashboardPage() {
  const user = await requireAuth().catch(() => null);
  if (!user) redirect('/login');
  if (user.role === 'ADMIN') redirect('/dashboard/admin');
  if (user.role === 'STUDENT') {
    await dbConnect();
    const profile = await StudentProfileModel.findOne({ userId: user._id })
      .select('onboardingCompleted')
      .lean();
    redirect(profile?.onboardingCompleted ? '/student/internship' : '/student/onboarding');
  }
  if (user.role === 'MENTOR') redirect('/mentor/dashboard');
  redirect('/');
}
