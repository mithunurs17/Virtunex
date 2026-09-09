'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Program {
  _id: string;
  title: string;
  description: string;
  category: string;
  durationWeeks: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tracks: string[];
  objectives: string[];
  prerequisites: string[];
  learningOutcomes: string[];
}

interface StudentProfile {
  userId: string;
  onboardingCompleted?: boolean;
}

interface ExistingEnrollment {
  _id: string;
  status: string;
}

export default function ProgramDetailPage() {
  const params = useParams() as { programId: string };
  const router = useRouter();
  const programId = params.programId;

  const [program, setProgram] = useState<Program | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [existingEnrollment, setExistingEnrollment] = useState<ExistingEnrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const progRes = await fetch(`/api/programs/${programId}`);
        if (!progRes.ok) throw new Error('Program not found');
        const progData = await progRes.json();
        setProgram(progData.result);

        const profileRes = await fetch('/api/students/me');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.profile?.userId) {
            setSignedIn(true);
            setProfile(profileData.profile);

            const enrollRes = await fetch(
              `/api/enrollments?programId=${programId}`
            );
            if (enrollRes.ok) {
              const enrollData = await enrollRes.json();
              if (enrollData.result?.length) setExistingEnrollment(enrollData.result[0]);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load program');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [programId]);

  const handleApply = async () => {
    if (!program) return;

    setApplying(true);
    setError(null);
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId: program._id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to apply');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/student/internship');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 pt-28">
          <p className="text-muted">Loading program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 pt-28">
          <p className="text-red-400">{error || 'Program not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-28 pb-20">
        <Link href="/internships" className="text-muted hover:text-foreground transition mb-6 inline-block">
          ← All programs
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-br from-jamoon/20 to-jamoon-bright/10 rounded-3xl p-8 border border-border mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-light text-foreground flex-1">{program.title}</h1>
            <span className="ml-4 px-4 py-2 bg-jamoon text-foreground rounded-full text-sm font-medium">
              {program.level}
            </span>
          </div>
          <p className="text-lg text-muted mb-6">{program.description}</p>
          <div className="flex flex-wrap gap-4">
            <div>
              <div className="text-muted text-sm">Category</div>
              <div className="font-medium text-foreground">{program.category}</div>
            </div>
            <div>
              <div className="text-muted text-sm">Duration</div>
              <div className="font-medium text-foreground">{program.durationWeeks} weeks</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tracks */}
            {program.tracks.length > 0 && (
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-medium text-foreground mb-4">Tracks</h2>
                <div className="flex flex-wrap gap-2">
                  {program.tracks.map((track) => (
                    <span key={track} className="px-3 py-1 bg-jamoon/20 text-jamoon rounded-full text-sm">
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            {program.objectives.length > 0 && (
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-medium text-foreground mb-4">Learning Objectives</h2>
                <ul className="space-y-2">
                  {program.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted">
                      <span className="text-jamoon mt-1">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {program.prerequisites.length > 0 && (
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-medium text-foreground mb-4">Prerequisites</h2>
                <ul className="space-y-2">
                  {program.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted">
                      <span className="text-accent mt-1">→</span>
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learning Outcomes */}
            {program.learningOutcomes.length > 0 && (
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-medium text-foreground mb-4">Learning Outcomes</h2>
                <ul className="space-y-2">
                  {program.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted">
                      <span className="text-accent-light mt-1">★</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 border border-border sticky top-24">
              {success && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">✓ Application submitted! Redirecting...</p>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {!signedIn ? (
                <div>
                  <p className="text-muted mb-4">Sign in to apply for this internship program.</p>
                  <Link
                    href="/login"
                    className="block w-full px-4 py-3 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition text-center font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              ) : !profile?.onboardingCompleted ? (
                <div>
                  <p className="text-foreground font-medium mb-2">Complete your profile first</p>
                  <p className="text-muted text-sm mb-4">
                    We need a few academic details before you can apply.
                  </p>
                  <Link
                    href="/student/onboarding"
                    className="block w-full px-4 py-3 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition text-center font-medium"
                  >
                    Complete profile
                  </Link>
                </div>
              ) : existingEnrollment ? (
                <div>
                  <p className="text-foreground font-medium mb-2">You&apos;ve already applied</p>
                  <p className="text-muted text-sm mb-4">Status: {existingEnrollment.status}</p>
                  <Link
                    href="/student/internship"
                    className="block w-full px-4 py-3 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition text-center font-medium"
                  >
                    View my internship
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-foreground font-medium mb-4">Ready to apply?</p>
                  <button
                    onClick={handleApply}
                    disabled={applying || success}
                    className="w-full px-4 py-3 bg-jamoon hover:bg-jamoon-bright disabled:opacity-50 disabled:cursor-not-allowed text-foreground rounded-xl transition font-medium"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}