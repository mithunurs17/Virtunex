'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface Program {
  _id: string;
  title: string;
}

interface Batch {
  _id: string;
  name: string;
  code: string;
}

interface Branch {
  _id: string;
  name: string;
  code: string;
}

interface Enrollment {
  _id: string;
  studentId: User;
  programId: Program;
  batchId: Batch | null;
  branchId: Branch | null;
  status: 'APPLIED' | 'APPROVED' | 'ACTIVE' | 'COMPLETED' | 'REJECTED' | 'WITHDRAWN';
  paymentStatus: 'pending' | 'partial' | 'full';
  enrollmentDate: string;
  completionPercentage: number;
}

export default function AdminEnrollmentsPage() {
  const [authed, setAuthed] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check admin auth
        const authRes = await fetch('/api/admin/me');
        if (!authRes.ok) {
          window.location.href = '/login';
          return;
        }

        setAuthed(true);

        // Load enrollments and batches
        const [enrollRes, batchRes] = await Promise.all([
          fetch('/api/enrollments'),
          fetch('/api/batches'),
        ]);

        if (enrollRes.ok) {
          const data = await enrollRes.json();
          setEnrollments(data.result || []);
        }

        if (batchRes.ok) {
          const data = await batchRes.json();
          setBatches(data.result || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = enrollments;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          (e.studentId?.fullName || '').toLowerCase().includes(query) ||
          (e.studentId?.email || '').toLowerCase().includes(query) ||
          (e.programId?.title || '').toLowerCase().includes(query)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    setFilteredEnrollments(filtered);
  }, [enrollments, searchQuery, statusFilter]);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch('/api/enrollments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'APPROVED' }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnrollments(enrollments.map((e) => (e._id === id ? data.result : e)));
      }
    } catch (error) {
      console.error('Error approving enrollment:', error);
      alert('Failed to approve enrollment');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch('/api/enrollments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'REJECTED' }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnrollments(enrollments.map((e) => (e._id === id ? data.result : e)));
      }
    } catch (error) {
      console.error('Error rejecting enrollment:', error);
      alert('Failed to reject enrollment');
    }
  };

  const handleAssignBatch = async (id: string, batchId: string) => {
    try {
      const res = await fetch('/api/enrollments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, batchId }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnrollments(enrollments.map((e) => (e._id === id ? data.result : e)));
      }
    } catch (error) {
      console.error('Error assigning batch:', error);
      alert('Failed to assign batch');
    }
  };

  if (!authed || loading) return null;

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-light mb-8">Enrollment Management</h1>

        {/* Filters */}
        <div className="bg-surface rounded-2xl p-6 border border-border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted text-sm mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon"
              />
            </div>

            <div>
              <label className="block text-muted text-sm mb-2">Status Filter</label>
              <select
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value || null)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
              >
                <option value="">All Statuses</option>
                <option value="APPLIED">Applied</option>
                <option value="APPROVED">Approved</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-surface rounded-2xl overflow-x-auto border border-border">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Student</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Program</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Payment</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Batch</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Progress</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment._id} className="border-b border-border/50 hover:bg-card/50 transition">
                  <td className="px-6 py-4">
                    <div className="text-foreground font-medium">{enrollment.studentId?.fullName}</div>
                    <div className="text-muted text-xs">{enrollment.studentId?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">{enrollment.programId?.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        enrollment.status === 'APPROVED'
                          ? 'bg-green-500/20 text-green-400'
                          : enrollment.status === 'APPLIED'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : enrollment.status === 'REJECTED'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-jamoon/20 text-jamoon'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">{enrollment.paymentStatus}</td>
                  <td className="px-6 py-4">
                    {enrollment.batchId ? (
                      <div className="text-foreground font-medium">{enrollment.batchId.name}</div>
                    ) : enrollment.status === 'APPROVED' ? (
                      <select
                        onChange={(e) => handleAssignBatch(enrollment._id, e.target.value)}
                        className="px-2 py-1 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:border-jamoon"
                      >
                        <option value="">Assign Batch</option>
                        {batches.map((b) => (
                          <option key={b._id} value={b._id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-muted text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">{enrollment.completionPercentage}%</td>
                  <td className="px-6 py-4 space-x-2">
                    {enrollment.status === 'APPLIED' && (
                      <>
                        <button
                          onClick={() => handleApprove(enrollment._id)}
                          className="px-3 py-1 text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(enrollment._id)}
                          className="px-3 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEnrollments.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted">No enrollments found</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-muted text-sm">
          Showing {filteredEnrollments.length} of {enrollments.length} enrollments
        </div>
      </div>
    </div>
  );
}
