'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BarChart, LayoutDashboard, Database, FolderGit2, Settings, X, Layers, Users } from 'lucide-react';

type Branch = { _id: string; name: string; code: string };
type Project = { _id: string; title: string; description: string; branches: Branch[]; createdAt?: string };
type Batch = { _id: string; name: string; status: 'available' | 'expired'; capacity: number; enrolled: number; schedule?: string; startDate?: string; endDate?: string };

export default function AdminAnalyticsDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  type EnrollmentRow = { _id: string; fullName: string; email: string; whatsapp: string; college: string; yop: string; projectId?: { _id?: string; title?: string }; createdAt?: string; branchId?: { _id?: string; name: string }; batchId?: { name: string }; payment: 'partial' | 'full'; certificateDistributedAt?: string | null };
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeSection, setActiveSection] = useState<'overview' | 'branches' | 'projects' | 'batches' | 'users' | 'settings'>('overview');
  const [viewBranch, setViewBranch] = useState<Branch | null>(null);
  const [viewEnrollment, setViewEnrollment] = useState<EnrollmentRow | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'branch' | 'project' | 'batch' | 'enrollment'; id: string; name: string } | null>(null);
  const [confirmCert, setConfirmCert] = useState<{ id: string; email: string } | null>(null);
  const [confirmingCert, setConfirmingCert] = useState(false);
  const [confirmDeleting, setConfirmDeleting] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [editUser, setEditUser] = useState<EnrollmentRow | null>(null);
  const [editBranchId, setEditBranchId] = useState<string>('');
  const [editProjectId, setEditProjectId] = useState<string>('');

  // Branch form state
  const [newBranch, setNewBranch] = useState({ name: '', code: '' });
  const [editingBranchId, setEditingBranchId] = useState<string>('');
  const [editingBranch, setEditingBranch] = useState({ name: '', code: '' });

  // Project form state
  const [newProject, setNewProject] = useState({ title: '', description: '', branchIds: [] as string[] });
  const [editingProjectId, setEditingProjectId] = useState<string>('');
  const [editingProject, setEditingProject] = useState({ title: '', description: '', branchIds: [] as string[] });

  // Batch form state
  const [newBatch, setNewBatch] = useState({ name: '', status: 'available' as 'available' | 'expired', capacity: 0, enrolled: 0, schedule: '' });
  const [editingBatchId, setEditingBatchId] = useState<string>('');
  const [editingBatch, setEditingBatch] = useState({ name: '', status: 'available' as 'available' | 'expired', capacity: 0, enrolled: 0, schedule: '' });

  useEffect(() => {
    fetch('/api/admin/me').then((response) => {
      if (!response.ok) { router.replace('/dashboard'); return; }
      run();
    });
    const run = async () => {
      try {
        const [b, p, bt, en] = await Promise.all([
          fetch('/api/branches', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/projects', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/batches', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/enrollments', { cache: 'no-store' }).then(r => r.json()),
        ]);
        setBranches(Array.isArray(b?.result) ? b.result : []);
        setProjects(Array.isArray(p?.result) ? p.result : []);
        setBatches(Array.isArray(bt?.result) ? bt.result : []);
        setEnrollments(Array.isArray(en?.result) ? en.result : []);
      } finally {
        setLoading(false);
      }
    };
  }, [router, refreshKey]);

  // Sync active section with hash (without navigation reload)
  useEffect(() => {
    try {
      const hash = (typeof window !== 'undefined' ? window.location.hash : '').replace('#','');
      if (hash === 'branches' || hash === 'projects' || hash === 'batches' || hash === 'settings') {
        setActiveSection(hash as 'branches' | 'projects' | 'batches' | 'settings');
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const newHash = activeSection === 'overview' ? '' : `#${activeSection}`;
      const newUrl = newHash ? `${window.location.pathname}${newHash}` : window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    } catch {}
  }, [activeSection]);

  const metrics = useMemo(() => {
    const totalBranches = branches.length;
    const totalProjects = projects.length;
    const projectsPerBranch: { branchName: string; count: number }[] = [];
    const branchIdToCount: Record<string, number> = {};
    for (const b of branches) branchIdToCount[b._id] = 0;
    for (const p of projects) {
      for (const b of p.branches || []) {
        branchIdToCount[b._id] = (branchIdToCount[b._id] || 0) + 1;
      }
    }
    for (const b of branches) {
      projectsPerBranch.push({ branchName: `${b.name} (${b.code})`, count: branchIdToCount[b._id] || 0 });
    }

    // Build simple monthly buckets for sparkline (last 10 points)
    const byMonth = new Map<string, number>();
    for (const p of projects) {
      const d = p.createdAt ? new Date(p.createdAt) : new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      byMonth.set(key, (byMonth.get(key) || 0) + 1);
    }
    const keys = Array.from(byMonth.keys()).sort();
    const series = keys.slice(-10).map(k => byMonth.get(k) || 0);

    return { totalBranches, totalProjects, projectsPerBranch, series };
  }, [branches, projects]);

  // Daily enrollments (last 14 days) with date labels
  const enrollTrend = useMemo(() => {
    const days = 14;
    const today = new Date();
    const values: number[] = [];
    const labels: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const key = `${yyyy}-${mm}-${dd}`;
      const label = `${dd}/${mm}`;
      const count = enrollments.filter((e) => {
        const created = e?.createdAt ? new Date(e.createdAt) : null;
        if (!created) return false;
        const k = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;
        return k === key;
      }).length;
      values.push(count);
      labels.push(label);
    }
    return { values, labels };
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return enrollments;
    return enrollments.filter((e) => {
      const email = (e.email || '').toLowerCase();
      const phone = (e.whatsapp || '').toLowerCase();
      return email.includes(q) || phone.includes(q);
    });
  }, [userSearch, enrollments]);

  // Keep placeholder for potential future overview widgets
  // const recentProjects = useMemo(() => {
  //   return [...projects].sort((a, b) => {
  //     const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //     const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  //     return db - da;
  //   }).slice(0, 8);
  // }, [projects]);

  const triggerRefresh = () => setRefreshKey(k => k + 1);

  const viewProjects = useMemo(() => {
    if (!viewBranch) return [] as Project[];
    return projects.filter(p => p.branches?.some(x => x._id === viewBranch._id));
  }, [viewBranch, projects]);

  const projectsForEditBranch = useMemo(() => {
    if (!editBranchId) return projects;
    return projects.filter(p => (p.branches || []).some(b => b._id === editBranchId));
  }, [projects, editBranchId]);

  // Branch actions
  const createBranch = async () => {
    if (!newBranch.name || !newBranch.code) return;
    await fetch('/api/branches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBranch) });
    setNewBranch({ name: '', code: '' });
    triggerRefresh();
  };

  const startEditBranch = (b: Branch) => {
    setEditingBranchId(b._id);
    setEditingBranch({ name: b.name, code: b.code });
  };

  const saveEditBranch = async () => {
    if (!editingBranchId) return;
    await fetch('/api/branches', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingBranchId, ...editingBranch }) });
    setEditingBranchId('');
    setEditingBranch({ name: '', code: '' });
    triggerRefresh();
  };

  const cancelEditBranch = () => {
    setEditingBranchId('');
    setEditingBranch({ name: '', code: '' });
  };

  const deleteBranch = async (id: string) => {
    await fetch(`/api/branches?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    triggerRefresh();
  };

  // Project actions
  const toggleNewProjectBranch = (id: string) => {
    setNewProject(s => ({ ...s, branchIds: s.branchIds.includes(id) ? s.branchIds.filter(x => x !== id) : [...s.branchIds, id] }));
  };

  const toggleEditProjectBranch = (id: string) => {
    setEditingProject(s => ({ ...s, branchIds: s.branchIds.includes(id) ? s.branchIds.filter(x => x !== id) : [...s.branchIds, id] }));
  };

  const createProject = async () => {
    if (!newProject.title) return;
    await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: newProject.title, description: newProject.description, branches: newProject.branchIds }) });
    setNewProject({ title: '', description: '', branchIds: [] });
    triggerRefresh();
  };

  const startEditProject = (p: Project) => {
    setEditingProjectId(p._id);
    setEditingProject({ title: p.title, description: p.description || '', branchIds: (p.branches || []).map(b => b._id) });
  };

  const saveEditProject = async () => {
    if (!editingProjectId) return;
    await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingProjectId, title: editingProject.title, description: editingProject.description, branches: editingProject.branchIds }) });
    setEditingProjectId('');
    setEditingProject({ title: '', description: '', branchIds: [] });
    triggerRefresh();
  };

  const cancelEditProject = () => {
    setEditingProjectId('');
    setEditingProject({ title: '', description: '', branchIds: [] });
  };

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    triggerRefresh();
  };

  // Batch actions
  const createBatch = async () => {
    if (!newBatch.name) return;
    await fetch('/api/batches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBatch) });
    setNewBatch({ name: '', status: 'available', capacity: 0, enrolled: 0, schedule: '' });
    triggerRefresh();
  };

  const startEditBatch = (bt: Batch) => {
    setEditingBatchId(bt._id);
    setEditingBatch({ name: bt.name, status: bt.status, capacity: bt.capacity || 0, enrolled: bt.enrolled || 0, schedule: bt.schedule || '' });
  };

  const saveEditBatch = async () => {
    if (!editingBatchId) return;
    await fetch('/api/batches', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingBatchId, ...editingBatch }) });
    setEditingBatchId('');
    setEditingBatch({ name: '', status: 'available', capacity: 0, enrolled: 0, schedule: '' });
    triggerRefresh();
  };

  const cancelEditBatch = () => {
    setEditingBatchId('');
    setEditingBatch({ name: '', status: 'available', capacity: 0, enrolled: 0, schedule: '' });
  };

  const deleteBatch = async (id: string) => {
    await fetch(`/api/batches?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    triggerRefresh();
  };

  const deleteEnrollment = async (id: string) => {
    await fetch(`/api/enrollments?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    triggerRefresh();
  };

  const markCertificate = async (id: string) => {
    setConfirmingCert(true);
    try {
      await fetch('/api/enrollments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, certificateDistributedAt: new Date().toISOString() })
      });
      setConfirmCert(null);
      triggerRefresh();
    } finally {
      setConfirmingCert(false);
    }
  };

  const confirmAndDelete = async () => {
    if (!confirmDelete) return;
    try {
      setConfirmDeleting(true);
      if (confirmDelete.type === 'branch') {
        await deleteBranch(confirmDelete.id);
      } else if (confirmDelete.type === 'project') {
        await deleteProject(confirmDelete.id);
      } else if (confirmDelete.type === 'batch') {
        await deleteBatch(confirmDelete.id);
      } else if (confirmDelete.type === 'enrollment') {
        await deleteEnrollment(confirmDelete.id);
      }
      setConfirmDelete(null);
    } finally {
      setConfirmDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />

      <div className="max-w-7xl  pt-28 mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-4 h-max">
          <div className="flex items-center gap-2 text-slate-900 mb-4">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Admin</span>
          </div>
          <nav className="space-y-1">
            <button onClick={()=>setActiveSection('overview')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='overview' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><BarChart className="w-4 h-4" /> Overview</button>
            <button onClick={()=>setActiveSection('branches')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='branches' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><Database className="w-4 h-4" /> Branches</button>
            <button onClick={()=>setActiveSection('projects')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='projects' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><FolderGit2 className="w-4 h-4" /> Projects</button>
            <button onClick={()=>setActiveSection('batches')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='batches' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><Layers className="w-4 h-4" /> Batches</button>
            <button onClick={()=>setActiveSection('users')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='users' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><Users className="w-4 h-4" /> Users</button>
            <button onClick={()=>setActiveSection('settings')} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl ${activeSection==='settings' ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-100 text-slate-700'}`}><Settings className="w-4 h-4" /> Settings</button>
          </nav>
          {/* Filter removed */}
          <button
            onClick={() => { window.location.href = '/auth/logout'; }}
            className="mt-6 w-full text-sm text-slate-600 underline">
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="space-y-6">
          {/* Topbar */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-medium text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 text-sm">Monitor branches and projects at a glance</p>
            </div>
            <div className="text-sm text-slate-500">{loading ? 'Loading…' : `${metrics.totalBranches} branches • ${metrics.totalProjects} projects`}</div>
          </div>

          {activeSection === 'overview' && (
            <>
              {/* KPI Row */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
                  <div className="text-slate-500 text-sm">Total Branches</div>
                  <div className="text-3xl font-light text-slate-900 mt-1">{metrics.totalBranches}</div>
                  <div className="mt-4">
                    <MiniBar values={metrics.projectsPerBranch.map(x => x.count)} />
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
                  <div className="text-slate-500 text-sm">Total Projects</div>
                  <div className="text-3xl font-light text-slate-900 mt-1">{metrics.totalProjects}</div>
                  <div className="mt-4">
                    <Sparkline values={metrics.series} />
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
                  <div className="text-slate-500 text-sm">Avg. Projects / Branch</div>
                  <div className="text-3xl font-light text-slate-900 mt-1">{metrics.totalBranches ? Math.round((metrics.totalProjects / Math.max(1, metrics.totalBranches)) * 10) / 10 : 0}</div>
                  <div className="text-xs text-slate-500 mt-2">Across all branches</div>
                </div>
              </section>

              {/* Charts Row removed as requested */}

              {/* Enrollments graph */}
              <section className="grid grid-cols-1 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-900">Daily Enrollments</h3>
                    <span className="text-xs text-slate-500">Last 14 days</span>
                  </div>
                  <AxesLine values={enrollTrend.values} labels={enrollTrend.labels} />
                </div>
              </section>
            </>
          )}

          {activeSection === 'branches' && (
            <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Branches</h3>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-end">
                <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" placeholder="Branch name" value={newBranch.name} onChange={e=>setNewBranch(s=>({ ...s, name: e.target.value }))} />
                <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" placeholder="Code (e.g., CSE)" value={newBranch.code} onChange={e=>setNewBranch(s=>({ ...s, code: e.target.value }))} />
                <button onClick={createBranch} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Create</button>
              </div>
              <ul className="divide-y divide-slate-100">
                {branches.map(b => (
                  <li key={b._id} className="py-2">
                    {editingBranchId === b._id ? (
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" value={editingBranch.name} onChange={e=>setEditingBranch(s=>({ ...s, name: e.target.value }))} />
                        <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" value={editingBranch.code} onChange={e=>setEditingBranch(s=>({ ...s, code: e.target.value }))} />
                        <div className="ml-auto flex gap-2">
                          <button onClick={saveEditBranch} className="px-3 py-2 rounded-xl bg-slate-900/90 text-white">Save</button>
                          <button onClick={cancelEditBranch} className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-slate-900">{b.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{b.code}</span>
                            <button onClick={()=>setViewBranch(b)} className="underline text-slate-700 hover:text-slate-900">
                              View {projects.filter(p => p.branches?.some(x => x._id === b._id)).length} {projects.filter(p => p.branches?.some(x => x._id === b._id)).length === 1 ? 'project' : 'projects'}
                            </button>
                          </div>
                        </div>
                        <button onClick={()=>startEditBranch(b)} className="text-sm text-slate-700 px-3 py-1.5 rounded-lg bg-white border border-slate-200">Edit</button>
                        <button onClick={()=>setConfirmDelete({ type: 'branch', id: b._id, name: b.name })} className="text-sm text-rose-600 px-3 py-1.5 rounded-lg bg-white border border-slate-200">Delete</button>
                      </div>
                    )}
                  </li>
                ))}
                {branches.length === 0 && (
                  <li className="py-4 text-center text-slate-500">No branches found</li>
                )}
              </ul>
            </section>
          )}

          {activeSection === 'projects' && (
          <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Projects</h3>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start">
              <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" placeholder="Project title" value={newProject.title} onChange={e=>setNewProject(s=>({ ...s, title: e.target.value }))} />
              <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" placeholder="Description" value={newProject.description} onChange={e=>setNewProject(s=>({ ...s, description: e.target.value }))} />
              <button onClick={createProject} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Create</button>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {branches.map(b => (
                <button key={b._id} onClick={()=>toggleNewProjectBranch(b._id)} className={`px-3 py-1.5 rounded-full text-xs border ${newProject.branchIds.includes(b._id) ? 'bg-slate-900/90 text-white border-slate-800/30' : 'bg-white text-slate-700 border-white/40'}`}>{b.name}</button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-2 pr-4">Title</th>
                    <th className="py-2 pr-4">Branches</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id} className="border-t border-slate-100 align-top">
                      <td className="py-2 pr-4 text-slate-900">
                        {editingProjectId === p._id ? (
                          <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900 w-full" value={editingProject.title} onChange={e=>setEditingProject(s=>({ ...s, title: e.target.value }))} />
                        ) : (
                          p.title
                        )}
                      </td>
                      <td className="py-2 pr-4 text-slate-700">
                        {editingProjectId === p._id ? (
                          <div className="flex flex-wrap gap-2">
                            {branches.map(b => (
                              <button key={b._id} onClick={()=>toggleEditProjectBranch(b._id)} className={`px-3 py-1.5 rounded-full text-xs border ${editingProject.branchIds.includes(b._id) ? 'bg-slate-900/90 text-white border-slate-800/30' : 'bg-white text-slate-700 border-white/40'}`}>{b.name}</button>
                            ))}
                          </div>
                        ) : (
                          p.branches?.map(b => b.code).join(', ') || '—'
                        )}
                      </td>
                      <td className="py-2 pr-4 text-slate-700">
                        {editingProjectId === p._id ? (
                          <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900 w-full" value={editingProject.description} onChange={e=>setEditingProject(s=>({ ...s, description: e.target.value }))} />
                        ) : (
                          p.description || '—'
                        )}
                      </td>
                      <td className="py-2">
                        {editingProjectId === p._id ? (
                          <div className="flex gap-2">
                            <button onClick={saveEditProject} className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white">Save</button>
                            <button onClick={cancelEditProject} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Cancel</button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={()=>startEditProject(p)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Edit</button>
                            <button onClick={()=>setConfirmDelete({ type: 'project', id: p._id, name: p.title })} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-rose-600">Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-500">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          )}

          {activeSection === 'settings' && (
            <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
              <h3 className="text-sm font-medium text-slate-900 mb-2">Settings</h3>
              <p className="text-sm text-slate-600">Role-based access, user management, and audit logs can be added here.</p>
            </section>
          )}

          {activeSection === 'users' && (
            <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Users (Enrollments)</h3>
              <div className="mb-3 flex items-center gap-2">
                <input
                  value={userSearch}
                  onChange={(e)=>setUserSearch(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900"
                  placeholder="Search by email or phone"
                />
                {userSearch && (
                  <button onClick={()=>setUserSearch('')} className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Clear</button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">WhatsApp</th>
                      <th className="py-2 pr-4">College</th>
                      <th className="py-2 pr-4">YOP</th>
                      <th className="py-2 pr-4">Branch</th>
                      <th className="py-2 pr-4">Certificate</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((e) => (
                      <tr key={e._id} className="border-t border-slate-100">
                        <td className="py-2 pr-4 text-slate-700">
                          <button onClick={()=>setViewEnrollment(e)} className="underline text-slate-700 hover:text-slate-900 cursor-pointer">{e.email}</button>
                        </td>
                        <td className="py-2 pr-4 text-slate-700">{e.whatsapp}</td>
                        <td className="py-2 pr-4 text-slate-700">{e.college}</td>
                        <td className="py-2 pr-4 text-slate-700">{e.yop}</td>
                        <td className="py-2 pr-4 text-slate-700">{e.branchId?.name || '—'}</td>
                        <td className="py-2 pr-4 text-slate-700">
                          {e.certificateDistributedAt ? (
                            <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">Distributed</span>
                          ) : (
                            <button onClick={()=>setConfirmCert({ id: e._id, email: e.email })} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Mark Distributed</button>
                          )}
                        </td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <button onClick={()=>{ setEditUser(e); setEditBranchId(e.branchId?._id || ''); setEditProjectId(e.projectId?._id || ''); }} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Edit</button>
                            <button onClick={()=>setConfirmDelete({ type: 'enrollment', id: e._id, name: e.email })} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-rose-600">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredEnrollments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-4 text-center text-slate-500">No enrollments yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'batches' && (
            <>
              <section className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm p-5">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Batches</h3>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto_1fr] gap-2 items-end">
                  <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 placeholder:text-slate-500 text-slate-900" placeholder="Batch name" value={newBatch.name} onChange={e=>setNewBatch(s=>({ ...s, name: e.target.value }))} />
                  <select className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" value={newBatch.status} onChange={e=>setNewBatch(s=>({ ...s, status: e.target.value as 'available' | 'expired' }))}>
                    <option value="available">Available</option>
                    <option value="expired">Expired</option>
                  </select>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Capacity</label>
                    <input type="number" className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" placeholder="0" value={newBatch.capacity} onChange={e=>setNewBatch(s=>({ ...s, capacity: Number(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Enrolled</label>
                    <input type="number" className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" placeholder="0" value={newBatch.enrolled} onChange={e=>setNewBatch(s=>({ ...s, enrolled: Number(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Schedule</label>
                    <input className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" placeholder="Mon–Fri, 7–9 PM IST" value={newBatch.schedule} onChange={e=>setNewBatch(s=>({ ...s, schedule: e.target.value }))} />
                  </div>
                  <button onClick={createBatch} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Create</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Capacity</th>
                        <th className="py-2 pr-4">Enrolled</th>
                        <th className="py-2 pr-4">Schedule</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map(bt => (
                        <tr key={bt._id} className="border-t border-slate-100">
                          <td className="py-2 pr-4 text-slate-900">
                            {editingBatchId === bt._id ? (
                              <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 w-full" value={editingBatch.name} onChange={e=>setEditingBatch(s=>({ ...s, name: e.target.value }))} />
                            ) : bt.name}
                          </td>
                          <td className="py-2 pr-4">
                            {editingBatchId === bt._id ? (
                              <select className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" value={editingBatch.status} onChange={e=>setEditingBatch(s=>({ ...s, status: e.target.value as 'available' | 'expired' }))}>
                                <option value="available">Available</option>
                                <option value="expired">Expired</option>
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs ${bt.status==='available' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>{bt.status}</span>
                            )}
                          </td>
                          <td className="py-2 pr-4 text-slate-900">
                            {editingBatchId === bt._id ? (
                              <input type="number" className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 w-28" value={editingBatch.capacity} onChange={e=>setEditingBatch(s=>({ ...s, capacity: Number(e.target.value) || 0 }))} />
                            ) : bt.capacity}
                          </td>
                          <td className="py-2 pr-4 text-slate-900">
                            {editingBatchId === bt._id ? (
                              <input type="number" className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 w-28" value={editingBatch.enrolled} onChange={e=>setEditingBatch(s=>({ ...s, enrolled: Number(e.target.value) || 0 }))} />
                            ) : bt.enrolled}
                          </td>
                          <td className="py-2 pr-4 text-slate-900">
                            {editingBatchId === bt._id ? (
                              <input className="px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 w-full" value={editingBatch.schedule} onChange={e=>setEditingBatch(s=>({ ...s, schedule: e.target.value }))} />
                            ) : (bt.schedule || '—')}
                          </td>
                          <td className="py-2">
                            {editingBatchId === bt._id ? (
                              <div className="flex gap-2">
                                <button onClick={saveEditBatch} className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white">Save</button>
                                <button onClick={cancelEditBatch} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Cancel</button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button onClick={()=>startEditBatch(bt)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700">Edit</button>
                                <button onClick={()=>setConfirmDelete({ type: 'batch', id: bt._id, name: bt.name })} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-rose-600">Delete</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {batches.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-slate-500">No batches found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </main>
        {viewBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-900">{viewBranch.name} projects</h3>
                <button onClick={()=>setViewBranch(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-3">Assigned projects: {viewProjects.length}</p>
              <ul className="max-h-64 overflow-auto divide-y divide-slate-100">
                {viewProjects.map(p => (
                  <li key={p._id} className="py-2">
                    <div className="text-slate-900">{p.title}</div>
                    <div className="text-xs text-slate-500">{p.description || 'No description'}</div>
                  </li>
                ))}
                {viewProjects.length === 0 && (
                  <li className="py-6 text-center text-slate-500">No projects assigned</li>
                )}
              </ul>
              <div className="mt-4 text-right">
                <button onClick={()=>setViewBranch(null)} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Close</button>
              </div>
            </div>
          </div>
        )}
        {editUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-900">Edit Branch & Project</h3>
                <button onClick={()=>setEditUser(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500 mb-3">{editUser.email}</div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Branch</label>
                  <select value={editBranchId} onChange={(e)=>{ setEditBranchId(e.target.value); setEditProjectId(''); }} className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900">
                    <option value="">Select a branch</option>
                    {branches.map(b => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Project</label>
                  <select value={editProjectId} onChange={(e)=>setEditProjectId(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900" disabled={!editBranchId}>
                    <option value="">Undecided</option>
                    {projectsForEditBranch.map(p => (
                      <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3">
                  Changing branch may alter available projects. Selecting &quot;Undecided&quot; clears project selection.
                </div>
              </div>
              <div className="mt-4 text-right flex items-center justify-end gap-2">
                <button onClick={()=>setEditUser(null)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Cancel</button>
                <button onClick={async ()=>{
                  if (!editUser) return;
                  await fetch('/api/enrollments', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editUser._id, branchId: editBranchId || undefined, projectId: editProjectId || 'undecided' }) });
                  setEditUser(null);
                  setEditBranchId('');
                  setEditProjectId('');
                  triggerRefresh();
                }} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Save</button>
              </div>
            </div>
          </div>
        )}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-900">Confirm deletion</h3>
                <button onClick={()=>setConfirmDelete(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-4">Are you sure you want to delete the {confirmDelete.type} “{confirmDelete.name}”? This action cannot be undone.</p>
              <div className="flex items-center justify-end gap-2">
                <button onClick={()=>setConfirmDelete(null)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Cancel</button>
                <button onClick={confirmAndDelete} disabled={confirmDeleting} className="px-4 py-2 rounded-xl bg-rose-600 text-white disabled:opacity-60">{confirmDeleting ? 'Deleting…' : 'Delete'}</button>
              </div>
            </div>
          </div>
        )}
        {confirmCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-900">Confirm certificate distribution</h3>
                <button onClick={()=>setConfirmCert(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-4">Mark certificate as distributed for “{confirmCert.email}”?</p>
              <div className="flex items-center justify-end gap-2">
                <button onClick={()=>setConfirmCert(null)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Cancel</button>
                <button onClick={()=>markCertificate(confirmCert.id)} disabled={confirmingCert} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white disabled:opacity-60">{confirmingCert ? 'Saving…' : 'Confirm'}</button>
              </div>
            </div>
          </div>
        )}
        {viewEnrollment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-900">Enrollment Details</h3>
                <button onClick={()=>setViewEnrollment(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-500">Name</span><div className="text-slate-900">{viewEnrollment.fullName}</div></div>
                <div><span className="text-slate-500">Email</span><div className="text-slate-900">{viewEnrollment.email}</div></div>
                <div><span className="text-slate-500">WhatsApp</span><div className="text-slate-900">{viewEnrollment.whatsapp}</div></div>
                <div><span className="text-slate-500">College</span><div className="text-slate-900">{viewEnrollment.college}</div></div>
                <div><span className="text-slate-500">YOP</span><div className="text-slate-900">{viewEnrollment.yop}</div></div>
                <div><span className="text-slate-500">Branch</span><div className="text-slate-900">{viewEnrollment.branchId?.name || '—'}</div></div>
                <div><span className="text-slate-500">Project</span><div className="text-slate-900">{viewEnrollment.projectId?.title || '—'}</div></div>
                <div><span className="text-slate-500">Batch</span><div className="text-slate-900">{viewEnrollment.batchId?.name || '—'}</div></div>
                <div><span className="text-slate-500">Payment</span><div className="text-slate-900 capitalize">{viewEnrollment.payment}</div></div>
                <div><span className="text-slate-500">Created</span><div className="text-slate-900">{viewEnrollment.createdAt ? new Date(viewEnrollment.createdAt).toLocaleString() : '—'}</div></div>
              </div>
              <div className="mt-4 text-right">
                <button onClick={()=>setViewEnrollment(null)} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function MiniBar({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const normalized = values.map(v => (v / max) || 0);
  return (
    <div className="h-10 flex items-end gap-1">
      {normalized.map((n, i) => (
        <div key={i} className="flex-1 bg-indigo-200" style={{ height: `${Math.max(10, n * 100)}%`, borderRadius: '6px' }} />
      ))}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 280; const h = 60; const pad = 6;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - (v / max) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline fill="none" stroke="rgb(79,70,229)" strokeWidth="2" points={points} />
      <polyline fill="rgba(79,70,229,0.15)" stroke="none" points={`${points} ${w - pad},${h - pad} ${pad},${h - pad}`} />
    </svg>
  );
}

// Bar chart removed from overview

// Line helper unused


function AxesLine({ values, labels }: { values: number[]; labels: string[] }) {
  const w = 640; const h = 220; const padLeft = 36; const padRight = 8; const padTop = 10; const padBottom = 28;
  const max = Math.max(1, ...values);
  const min = 0;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;
  const stepX = values.length > 1 ? innerW / (values.length - 1) : innerW;

  const yFor = (v: number) => padTop + (innerH - ((v - min) / Math.max(1, max - min)) * innerH);
  const xFor = (i: number) => padLeft + i * stepX;

  const points = values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ');

  // y-axis ticks: 0, ceil(max/4), ceil(max/2), ceil(3*max/4), max
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((max * i) / tickCount));

  // x-axis labels: show ~7 labels max to avoid overlap
  const maxXLabels = 7;
  const labelEvery = Math.ceil(labels.length / maxXLabels) || 1;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* axes */}
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + innerH} stroke="#CBD5E1" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + innerH} x2={padLeft + innerW} y2={padTop + innerH} stroke="#CBD5E1" strokeWidth="1" />

      {/* y grid + labels */}
      {ticks.map((t, i) => {
        const y = yFor(t);
        return (
          <g key={i}>
            <line x1={padLeft} y1={y} x2={padLeft + innerW} y2={y} stroke="#E2E8F0" strokeWidth="1" />
            <text x={padLeft - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#64748B">{t}</text>
          </g>
        );
      })}

      {/* x labels */}
      {labels.map((lbl, i) => (
        (i % labelEvery === 0 || i === labels.length - 1) ? (
          <text key={i} x={xFor(i)} y={padTop + innerH + 16} textAnchor="middle" fontSize="10" fill="#64748B">{lbl}</text>
        ) : null
      ))}

      {/* line */}
      <polyline fill="none" stroke="rgb(15,23,42)" strokeWidth="2.5" points={points} />
      {/* dots */}
      {values.map((v, i) => (
        <circle key={i} cx={xFor(i)} cy={yFor(v)} r="2.5" fill="rgb(15,23,42)" />
      ))}
    </svg>
  );
}

