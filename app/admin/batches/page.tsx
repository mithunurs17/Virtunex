'use client';

import { useEffect, useState } from 'react';

interface Program {
  _id: string;
  title: string;
}

interface Batch {
  _id: string;
  programId: Program;
  name: string;
  code: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  capacity: number;
  enrolledCount: number;
  startDate: string;
  endDate: string;
  schedule: string;
  mentorIds: Array<{ _id: string; fullName: string; email: string }>;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
}

export default function AdminBatchesPage() {
  const [authed, setAuthed] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [mentors, setMentors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    programId: '',
    name: '',
    code: '',
    capacity: 30,
    startDate: '',
    endDate: '',
    schedule: '',
    mentorIds: [] as string[],
  });

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

        // Load batches, programs, and mentors
        const [batchesRes, programsRes, mentorsRes] = await Promise.all([
          fetch('/api/batches'),
          fetch('/api/programs'),
          fetch('/api/users?role=MENTOR'),
        ]);

        if (batchesRes.ok) {
          const data = await batchesRes.json();
          setBatches(data.result || []);
        }

        if (programsRes.ok) {
          const data = await programsRes.json();
          setPrograms(data.result || []);
        }

        if (mentorsRes.ok) {
          const data = await mentorsRes.json();
          setMentors(data.result || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.programId || !formData.name || !formData.code) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate ? new Date(formData.startDate) : null,
          endDate: formData.endDate ? new Date(formData.endDate) : null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBatches([...batches, data.result]);
        setFormData({
          programId: '',
          name: '',
          code: '',
          capacity: 30,
          startDate: '',
          endDate: '',
          schedule: '',
          mentorIds: [],
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating batch:', error);
      alert('Failed to create batch');
    }
  };

  if (!authed || loading) return null;

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Batch Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition font-medium"
          >
            {showForm ? 'Cancel' : '+ Create Batch'}
          </button>
        </div>

        {showForm && (
          <div className="bg-surface rounded-2xl p-8 border border-border mb-8">
            <h2 className="text-xl font-medium text-foreground mb-6">Create New Batch</h2>
            <form onSubmit={handleCreateBatch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted text-sm mb-2">Program *</label>
                  <select
                    required
                    value={formData.programId}
                    onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
                  >
                    <option value="">Select Program</option>
                    {programs.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Batch A - Q1 2025"
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Batch Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., BA-Q1-2025"
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-muted text-sm mb-2">Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    placeholder="e.g., Mon-Fri 10am-1pm"
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted/50 focus:outline-none focus:border-jamoon"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-muted text-sm mb-2">Assign Mentors</label>
                  <div className="space-y-2">
                    {mentors.map((mentor) => (
                      <label key={mentor._id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.mentorIds.includes(mentor._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                mentorIds: [...formData.mentorIds, mentor._id],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                mentorIds: formData.mentorIds.filter((id) => id !== mentor._id),
                              });
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 text-foreground">{mentor.fullName}</span>
                        <span className="ml-2 text-muted text-sm">({mentor.email})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-jamoon hover:bg-jamoon-bright text-foreground rounded-xl transition font-medium"
                >
                  Create Batch
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-card hover:bg-surface text-foreground border border-border rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Batches Table */}
        <div className="bg-surface rounded-2xl overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Program</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Batch</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Capacity</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Dates</th>
                <th className="px-6 py-4 text-left text-muted text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch._id} className="border-b border-border/50 hover:bg-card/50 transition">
                  <td className="px-6 py-4 text-foreground text-sm">{(batch.programId as any)?.title || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="text-foreground font-medium">{batch.name}</div>
                    <div className="text-muted text-xs">{batch.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-jamoon/20 text-jamoon rounded text-xs font-medium">
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground text-sm">
                    {batch.enrolledCount}/{batch.capacity}
                  </td>
                  <td className="px-6 py-4 text-muted text-sm">
                    {batch.startDate ? new Date(batch.startDate).toLocaleDateString() : 'TBD'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-jamoon hover:text-jamoon-bright text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
