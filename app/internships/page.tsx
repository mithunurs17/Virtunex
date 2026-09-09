import Link from 'next/link';
import { BookOpen, ArrowRight, Clock3, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { dbConnect } from '@/lib/db';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { EnrollmentModel } from '@/models/Enrollment';
import { StudentProfileModel } from '@/models/StudentProfile';
import { getSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function InternshipsPage() {
  await dbConnect();
  const programs = await InternshipProgramModel.find({ active: true }).sort({ createdAt: 1 }).lean();

  const session = await getSession();
  const user = session.user;

  let onboardingCompleted = false;
  let appliedProgramIds: string[] = [];

  if (user?.role === 'STUDENT') {
    const profile = await StudentProfileModel.findOne({ userId: user._id })
      .select('onboardingCompleted')
      .lean();
    onboardingCompleted = Boolean(profile?.onboardingCompleted);

    const enrollments = await EnrollmentModel.find({ studentId: user._id })
      .select('programId')
      .lean();
    appliedProgramIds = enrollments.map((e) => String(e.programId));
  }

  const hasApplication = appliedProgramIds.length > 0;

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm font-semibold text-accent-light">
              <BookOpen className="h-4 w-4" /> VTU Recognized Internship Programs
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text md:text-7xl">
              Choose your <span className="text-accent-light">program.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Browse our internship programs, read the curriculum, and apply. Once you apply, track your
              application, batch, and mentor from your internship dashboard.
            </p>
          </div>

          {user?.role === 'STUDENT' && !onboardingCompleted && (
            <div className="mt-8 border border-border bg-surface p-5 text-sm text-muted">
              Complete your student profile before applying.{' '}
              <Link href="/student/onboarding" className="font-medium text-accent-light hover:text-text">
                Complete your profile →
              </Link>
            </div>
          )}

          {hasApplication && (
            <div className="mt-8 border border-jamoon/40 bg-jamoon/10 p-5 text-sm text-text">
              You already have an application on file.{' '}
              <Link href="/student/internship" className="font-medium text-accent-light hover:text-text">
                View your internship status →
              </Link>
            </div>
          )}

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programs.map((program) => {
              const alreadyApplied = appliedProgramIds.includes(String(program._id));
              return (
                <article
                  key={String(program._id)}
                  className="flex h-full flex-col border border-border bg-surface p-7 shadow-xl shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-light">
                      {program.level}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted">
                      <Clock3 className="h-3.5 w-3.5" /> {program.durationWeeks} weeks
                    </span>
                  </div>
                  <h2 className="mt-8 text-2xl font-semibold text-text">{program.title}</h2>
                  <p className="mt-4 min-h-20 text-sm leading-6 text-muted">{program.description}</p>
                  {program.tracks && program.tracks.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {program.tracks.slice(0, 4).map((track: string) => (
                        <span
                          key={track}
                          className="inline-flex items-center gap-1 border border-border bg-card px-3 py-1 text-xs text-muted"
                        >
                          <Layers className="h-3 w-3" /> {track}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-auto pt-7">
                    <Link
                      href={`/internships/${program._id}`}
                      className="inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-medium text-accent-light hover:text-text"
                    >
                      {alreadyApplied ? 'View application' : 'View program & apply'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
            {programs.length === 0 && (
              <div className="col-span-full border border-border bg-surface p-10 text-center text-muted">
                No internship programs are open right now. Please check back soon.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}