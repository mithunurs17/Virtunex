import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/permissions';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';
import { EnrollmentModel } from '@/models/Enrollment';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await requireAuth().catch(() => null);
  if (!user) redirect('/login');

  if (user.role === 'ADMIN') redirect('/dashboard/admin');
  if (user.role === 'MENTOR') redirect('/mentor/dashboard');

  if (user.role === 'STUDENT') {
    await dbConnect();

    const profile = await StudentProfileModel.findOne({ userId: user._id })
      .select('onboardingCompleted')
      .lean();

    if (!profile?.onboardingCompleted) {
      redirect('/student/onboarding');
    }

    const hasApplication = await EnrollmentModel.exists({ studentId: user._id });
    redirect(hasApplication ? '/student/internship' : '/internships');
  }

  redirect('/');
}