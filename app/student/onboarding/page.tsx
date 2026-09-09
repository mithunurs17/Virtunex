import { redirect } from 'next/navigation';
import { requireStudent } from '@/lib/permissions';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';
import { BranchModel } from '@/models/Branch';
import OnboardingForm from './OnboardingForm';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function StudentOnboardingPage() {
  const user = await requireStudent().catch(() => null);
  if (!user) redirect('/login');

  await dbConnect();
  const profile = await StudentProfileModel.findOne({ userId: user._id }).lean();

  let branchName = '';
  if (profile?.branchId) {
    const branch = await BranchModel.findById(profile.branchId).select('name').lean();
    branchName = branch?.name || '';
  }

  const completed = Boolean(profile?.onboardingCompleted);

  return (
    <main className="min-h-screen bg-background px-5 pb-16 pt-10 text-text">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-3">
          <Image src="/virtunex.png" alt="Virtunex" width={44} height={38} unoptimized />
          <span className="text-xl tracking-wide">Virtunex</span>
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-accent-light">Student profile</p>
        <h1 className="mt-3 text-4xl font-light">
          {completed ? 'Your profile' : 'Build your learning profile'}
        </h1>
        <p className="mt-3 text-muted">
          {completed
            ? 'Keep your academic and contact details up to date.'
            : 'A few details help us shape your path at Virtunex.'}
        </p>
        <OnboardingForm
          initialName={user.fullName || ''}
          isEditing={completed}
          initialValues={{
            phone: user.phone || '',
            usn: profile?.usn || '',
            collegeName: profile?.collegeName || '',
            branchName,
            graduationYear: profile?.graduationYear ? String(profile.graduationYear) : '',
            semester: profile?.semester ? String(profile.semester) : '',
            githubUrl: profile?.githubUrl || '',
            linkedinUrl: profile?.linkedinUrl || '',
            portfolioUrl: profile?.portfolioUrl || '',
            skills: (profile?.skills || []).join(', '),
          }}
        />
      </div>
    </main>
  );
}