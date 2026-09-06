'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

interface User {
  _id: string;
  fullName: string;
  email: string;
}

export default function ProgramDetailPage() {
  const params = useParams() as { programId: string };
  const router = useRouter();
  const programId = params.programId;

  const [program, setProgram] = useState<Program | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load program
        const progRes = await fetch(`/api/programs/${programId}`);
        if (!progRes.ok) throw new Error('Program not found');
        const progData = await progRes.json();
        setProgram(progData.result);

        // Check user authentication
        const userRes = await fetch('/api/students/me');
        if (userRes.ok) {
          const profileData = await userRes.json();
          if (profileData.profile?.userId) {
            // Get user details
            const meRes = await fetch('/api/users/me');
            if (meRes.ok) {
              const meData = await meRes.json();
              setUser(meData.user);
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
    if (!user || !program) return;

    setApplying(true);
    try {
      const studentRes = await fetch('/api/students/me');
      const studentData = await studentRes.json();

      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentData.profile?.userId,
          programId: program._id,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to apply');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/student/internship');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted">Loading program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background text-text p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-400">{error || 'Program not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="text-muted hover:text-foreground transition mb-6"
        >
          ← Back
        </button>

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
            <div className="bg-surface rounded-2xl p-6 border border-border sticky top-6">
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

              {!user ? (
                <div>
                  <p className="text-muted mb-4">Sign in to apply for this internship program.</p>
                  <a
                    href="/login"
                    className="block w-full px-4 py-3 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition text-center font-medium"
                  >
                    Sign In
                  </a>
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
    </div>
  );
}
