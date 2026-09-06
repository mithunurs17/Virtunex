'use client';

import { useEffect, useState } from 'react';

interface Enrollment {
  _id: string;
  status: 'APPLIED' | 'APPROVED' | 'ACTIVE' | 'COMPLETED' | 'REJECTED' | 'WITHDRAWN';
  programId: { _id: string; title: string; durationWeeks: number };
  batchId: { _id: string; name: string; code: string; startDate: string; endDate: string };
  completionPercentage: number;
  internshipReadinessScore: number;
  internshipStartDate?: string;
  internshipEndDate?: string;
}

interface MentorAssignment {
  mentorId: { fullName: string; email: string };
}

const TIMELINE_STEPS = [
  'Application',
  'Approved',
  'Batch Assigned',
  'Orientation',
  'Learning',
  'Assignments',
  'Projects',
  'Evaluation',
  'Completion',
  'Certificate',
];

const STATUS_TO_STEP: Record<string, number> = {
  APPLIED: 0,
  APPROVED: 1,
  ACTIVE: 3,
  COMPLETED: 8,
  REJECTED: -1,
  WITHDRAWN: -1,
};

export default function StudentInternshipPage() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [mentor, setMentor] = useState<MentorAssignment | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check authentication
        const authRes = await fetch('/api/students/me');
        if (!authRes.ok) {
          window.location.href = '/login';
          return;
        }

        // Get student profile to get user ID
        const profileRes = await authRes.json();
        const userId = profileRes.profile?.userId;

        if (!userId) {
          setLoading(false);
          return;
        }

        // Get active enrollment
        const enrollRes = await fetch(`/api/enrollments?studentId=${userId}&status=ACTIVE`);
        const enrollData = await enrollRes.json();
        if (enrollData.result && enrollData.result.length > 0) {
          setEnrollment(enrollData.result[0]);

          // Get mentor assignment
          if (enrollData.result[0].batchId) {
            const mentorRes = await fetch(
              `/api/mentor-assignments?studentId=${userId}&batchId=${enrollData.result[0].batchId._id}`
            );
            const mentorData = await mentorRes.json();
            if (mentorData.result && mentorData.result.length > 0) {
              setMentor(mentorData.result[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error loading internship data:', error);
      } finally {
        setLoading(false);
        setAuthed(true);
      }
    };

    loadData();
  }, []);

  if (!authed || loading) return null;

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background text-text p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light mb-6">My Internship</h1>
          <div className="bg-surface rounded-2xl p-8 text-center">
            <p className="text-muted mb-4">No active internship enrollment found.</p>
            <a
              href="/internships"
              className="inline-block px-6 py-2 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition"
            >
              Browse Internships
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = STATUS_TO_STEP[enrollment.status] ?? -1;
  const progressPercentage = enrollment.completionPercentage;
  const readinessPercentage = enrollment.internshipReadinessScore;

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-light mb-8">My Internship</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Program Card */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Program</div>
            <div className="text-xl font-medium text-foreground mb-2">{enrollment.programId.title}</div>
            <div className="text-sm text-muted">{enrollment.programId.durationWeeks} weeks</div>
          </div>

          {/* Batch Card */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Batch</div>
            <div className="text-xl font-medium text-foreground mb-2">{enrollment.batchId.name}</div>
            <div className="text-sm text-muted">Code: {enrollment.batchId.code}</div>
          </div>

          {/* Status Card */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Status</div>
            <div className="inline-block px-3 py-1 bg-jamoon/20 text-jamoon rounded-full text-sm font-medium">
              {enrollment.status}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Batch Start</div>
            <div className="text-lg font-medium text-foreground">
              {new Date(enrollment.batchId.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Batch End</div>
            <div className="text-lg font-medium text-foreground">
              {new Date(enrollment.batchId.endDate).toLocaleDateString()}
            </div>
          </div>
          {enrollment.internshipStartDate && (
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="text-muted text-sm mb-2">Internship Start</div>
              <div className="text-lg font-medium text-foreground">
                {new Date(enrollment.internshipStartDate).toLocaleDateString()}
              </div>
            </div>
          )}
          {enrollment.internshipEndDate && (
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <div className="text-muted text-sm mb-2">Internship End</div>
              <div className="text-lg font-medium text-foreground">
                {new Date(enrollment.internshipEndDate).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Mentor */}
        {mentor && (
          <div className="bg-surface rounded-2xl p-6 border border-border mb-8">
            <div className="text-muted text-sm mb-3">Assigned Mentor</div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-jamoon/20 rounded-full flex items-center justify-center">
                <span className="text-jamoon font-medium">
                  {mentor.mentorId.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{mentor.mentorId.fullName}</div>
                <div className="text-sm text-muted">{mentor.mentorId.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted">Progress</span>
              <span className="text-jamoon font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-card rounded-full h-2">
              <div
                className="bg-gradient-to-r from-jamoon to-jamoon-bright h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted">Readiness Score</span>
              <span className="text-jamoon font-medium">{readinessPercentage}%</span>
            </div>
            <div className="w-full bg-card rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent to-accent-light h-2 rounded-full transition-all"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-surface rounded-2xl p-8 border border-border">
          <h2 className="text-xl font-medium mb-6 text-foreground">Internship Timeline</h2>
          <div className="space-y-3">
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = currentStep > index;
              const isCurrent = currentStep === index;
              const isUpcoming = currentStep < index;

              return (
                <div key={step} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition ${
                      isCompleted
                        ? 'bg-jamoon text-foreground'
                        : isCurrent
                          ? 'bg-jamoon-bright text-foreground border-2 border-accent'
                          : 'bg-card text-muted border-2 border-border'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span
                    className={`transition ${
                      isCompleted || isCurrent ? 'text-foreground font-medium' : 'text-muted'
                    }`}
                  >
                    {step}
                  </span>
                  {isCurrent && <span className="ml-auto text-jamoon text-sm font-medium">Current</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
