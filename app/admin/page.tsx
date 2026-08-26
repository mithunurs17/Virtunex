'use client';

import { useEffect, useState } from 'react';

type Branch = { _id: string; name: string; code: string };
type Project = { _id: string; title: string; description: string; branches: Branch[] };

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newBranch, setNewBranch] = useState({ name: '', code: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '', branchIds: [] as string[] });

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === '1') {
      setAuthed(true);
      refresh();
    } else {
      window.location.href = '/admin/login';
    }
  }, []);

  const refresh = async () => {
    const [b, p] = await Promise.all([
      fetch('/api/branches').then(r=>r.json()),
      fetch('/api/projects').then(r=>r.json()),
    ]);
    setBranches(b.result);
    setProjects(p.result);
  };

  const addBranch = async () => {
    if (!newBranch.name || !newBranch.code) return;
    await fetch('/api/branches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBranch) });
    setNewBranch({ name: '', code: '' });
    await refresh();
  };

  const addProject = async () => {
    if (!newProject.title) return;
    await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: newProject.title, description: newProject.description, branches: newProject.branchIds }) });
    setNewProject({ title: '', description: '', branchIds: [] });
    await refresh();
  };

  const toggleProjectBranch = (id: string) => {
    setNewProject((s) => ({ ...s, branchIds: s.branchIds.includes(id) ? s.branchIds.filter(x=>x!==id) : [...s.branchIds, id] }));
  };

  if (!authed) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-light text-slate-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30">
          <h2 className="text-xl font-medium mb-4">Branches</h2>
          <div className="space-y-3 mb-4">
            <input className="w-full px-3 py-2 rounded-xl bg-white/80 border border-white/40" placeholder="Branch name" value={newBranch.name} onChange={(e)=>setNewBranch({...newBranch, name: e.target.value})} />
            <input className="w-full px-3 py-2 rounded-xl bg-white/80 border border-white/40" placeholder="Code (e.g., CSE)" value={newBranch.code} onChange={(e)=>setNewBranch({...newBranch, code: e.target.value})} />
            <button onClick={addBranch} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Add Branch</button>
          </div>
          <ul className="space-y-2">
            {branches.map((b) => (
              <li key={b._id} className="text-sm text-slate-700">{b.name} ({b.code})</li>
            ))}
          </ul>
        </section>
        <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30">
          <h2 className="text-xl font-medium mb-4">Projects</h2>
          <div className="space-y-3 mb-4">
            <input className="w-full px-3 py-2 rounded-xl bg-white/80 border border-white/40" placeholder="Project title" value={newProject.title} onChange={(e)=>setNewProject({...newProject, title: e.target.value})} />
            <textarea className="w-full px-3 py-2 rounded-xl bg-white/80 border border-white/40" placeholder="Description" value={newProject.description} onChange={(e)=>setNewProject({...newProject, description: e.target.value})} />
            <div className="flex flex-wrap gap-2">
              {branches.map((b) => (
                <button key={b._id} onClick={()=>toggleProjectBranch(b._id)} className={`px-3 py-1.5 rounded-full text-xs border ${newProject.branchIds.includes(b._id) ? 'bg-slate-900/90 text-white border-slate-800/30' : 'bg-white text-slate-700 border-white/40'}`}>{b.name}</button>
              ))}
            </div>
            <button onClick={addProject} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Add Project</button>
          </div>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p._id} className="text-sm text-slate-700">
                <div className="font-medium">{p.title}</div>
                <div className="text-slate-600">{p.description}</div>
                <div className="text-slate-500 text-xs mt-1">Branches: {p.branches?.map(b=>b.name).join(', ') || '—'}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


