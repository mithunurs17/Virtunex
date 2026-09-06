'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface Batch {
  _id: string;
  name: string;
  code: string;
  status: string;
}

interface MentorAssignment {
  _id: string;
  studentId: User;
  batchId: Batch;
}

interface Enrollment {
  _id: string;
  studentId: User;
  status: string;
  completionPercentage: number;
  internshipReadinessScore: number;
}

export default function MentorDashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<MentorAssignment[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check mentor auth
        const authRes = await fetch('/api/mentors/me');
        if (!authRes.ok) {
          window.location.href = '/login';
          return;
        }

        setAuthed(true);
        const userData = await authRes.json();
        const mentorUserId = userData.mentor?.userId;
        setUser({ _id: mentorUserId, fullName: userData.mentor?.fullName || '', email: '' });

        // Load assignments for this mentor
        const assignRes = await fetch(`/api/mentor-assignments?mentorId=${mentorUserId}`);
        if (assignRes.ok) {
          const data = await assignRes.json();
          setAssignments(data.result || []);

          // Get unique batches
          const uniqueBatches = [...new Map(data.result.map((a: any) => [a.batchId._id, a.batchId])).values()];
          setBatches(uniqueBatches as Batch[]);

          if (uniqueBatches.length > 0) {
            setSelectedBatch((uniqueBatches[0] as any)._id);
          }
        }

        // Load enrollments for students with this mentor
        const enrollRes = await fetch('/api/enrollments');
        if (enrollRes.ok) {
          const data = await enrollRes.json();
          setEnrollments(data.result || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const assignedStudents = selectedBatch
    ? assignments.filter((a) => a.batchId._id === selectedBatch).map((a) => a.studentId)
    : [];

  const studentStats = assignedStudents.map((student) => {
    const enrollment = enrollments.find((e) => e.studentId._id === student._id);
    return {
      student,
      status: enrollment?.status || 'APPLIED',
      progress: enrollment?.completionPercentage || 0,
      readiness: enrollment?.internshipReadinessScore || 0,
    };
  });

  const activeCount = studentStats.filter((s) => s.status === 'ACTIVE').length;
  const completedCount = studentStats.filter((s) => s.status === 'COMPLETED').length;
  const needingAttention = studentStats.filter((s) => s.readiness < 50 && s.status !== 'COMPLETED');

  if (!authed || loading) return null;

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-2">Mentor Dashboard</h1>
        {user && <p className="text-muted mb-8">Welcome, {user.fullName}</p>}

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Total Students</div>
            <div className="text-3xl font-light text-foreground">{assignedStudents.length}</div>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Active Internships</div>
            <div className="text-3xl font-light text-jamoon">{activeCount}</div>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Completed</div>
            <div className="text-3xl font-light text-accent-light">{completedCount}</div>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border">
            <div className="text-muted text-sm mb-2">Needing Attention</div>
            <div className="text-3xl font-light text-accent">{needingAttention.length}</div>
          </div>
        </div>

        {/* Batch Selection */}
        {batches.length > 0 && (
          <div className="bg-surface rounded-2xl p-6 border border-border mb-8">
            <label className="block text-muted text-sm mb-3">Select Batch</label>
            <select
              value={selectedBatch || ''}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
            >
              {batches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name} - {b.status}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Assigned Students */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium text-foreground mb-4">Assigned Students</h2>
            {studentStats.length > 0 ? (
              <div className="space-y-4">
                {studentStats.map(({ student, status, progress, readiness }) => (
                  <div key={student._id} className="bg-surface rounded-2xl p-6 border border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-foreground">{student.fullName}</h3>
                        <p className="text-sm text-muted">{student.email}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          status === 'ACTIVE'
                            ? 'bg-jamoon/20 text-jamoon'
                            : status === 'COMPLETED'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Progress</span>
                          <span className="text-foreground font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-card rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-jamoon to-jamoon-bright h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Readiness Score</span>
                          <span className="text-foreground font-medium">{readiness}%</span>
                        </div>
                        <div className="w-full bg-card rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-accent to-accent-light h-2 rounded-full"
                            style={{ width: `${readiness}%` }}
                          />
                        </div>
                      </div>

                      {readiness < 50 && status !== 'COMPLETED' && (
                        <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                          <p className="text-accent text-sm">⚠ Needs attention: Low readiness score</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface rounded-2xl p-8 border border-border text-center">
                <p className="text-muted">No students assigned to this batch yet</p>
              </div>
            )}
          </div>

          {/* Pending Reviews & Info */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-medium text-foreground mb-4">Students Needing Attention</h3>
              {needingAttention.length > 0 ? (
                <div className="space-y-3">
                  {needingAttention.map(({ student, readiness }) => (
                    <div key={student._id} className="p-3 bg-card rounded-lg">
                      <p className="text-sm font-medium text-foreground">{student.fullName}</p>
                      <p className="text-xs text-muted mt-1">Readiness: {readiness}%</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">All students on track!</p>
              )}
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="font-medium text-foreground mb-3">Active Batches</h3>
              <div className="space-y-2">
                {batches.map((b) => (
                  <div
                    key={b._id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedBatch === b._id ? 'bg-jamoon/20 border border-jamoon' : 'bg-card border border-border'
                    }`}
                    onClick={() => setSelectedBatch(b._id)}
                  >
                    <p className="text-sm font-medium text-foreground">{b.name}</p>
                    <p className="text-xs text-muted">{b.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
