'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { googleLogin, authenticateFromHash } from '@/lib/auth';
import Image from 'next/image';
import { useMemo } from 'react';

type BasicUser = { name?: string; email?: string; picture?: string };

export default function CandidateDashboardPage() {
  const [user, setUser] = useState<BasicUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [enrollment, setEnrollment] = useState<{
    _id: string;
    fullName: string;
    email: string;
    whatsapp: string;
    college: string;
    yop: string;
    branchId?: { _id?: string; name: string } | null;
    projectId?: { title?: string } | null;
    batchId?: { name: string; schedule?: string; startDate?: string; endDate?: string } | null;
    payment: 'partial' | 'full';
    createdAt?: string;
    picture?: string;
    certificateDistributedAt?: string | null;
  } | null>(null);
  const [projectOptions, setProjectOptions] = useState<{ id: string; title: string }[]>([]);
  const [savingProject, setSavingProject] = useState(false);
  const [projectChoice, setProjectChoice] = useState('undecided');

  // Handle Auth0 hash return and local session for candidate (separate from admin 'admin_auth')
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setSsoLoading(true);
      authenticateFromHash(window.location.hash).then((u) => {
        setSsoLoading(false);
        if (u?.email) {
          try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch {}
          setUser({ name: u.name, email: u.email, picture: u.picture });
        }
      });
    }
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (raw) {
        const parsed = JSON.parse(raw || '{}');
        setUser({ name: parsed?.name, email: parsed?.email, picture: parsed?.picture });
      }
    } catch {}
    setChecking(false);
  }, []);

  // Load enrollment for this candidate
  useEffect(() => {
    const run = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`/api/enrollments?email=${encodeURIComponent(user.email)}`, { cache: 'no-store' });
        const d = await res.json();
        if (d?.result) setEnrollment(d.result);
      } catch {}
    };
    run();
  }, [user?.email]);

  // Load projects for chosen branch if no project selected
  useEffect(() => {
    const run = async () => {
      if (!enrollment?.branchId?.name || enrollment?.projectId?.title) { setProjectOptions([]); return; }
      try {
        const branchIdVal = enrollment?.branchId?._id;
        let opts: { id: string; title: string }[] = [];
        if (branchIdVal) {
          const pr = await fetch(`/api/projects?branch=${branchIdVal}`, { cache: 'no-store' }).then(r=>r.json());
          opts = (pr?.result || []).map((p: { _id: string; title: string }) => ({ id: p._id, title: p.title }));
        }
        if (!opts.length) {
          const prAll = await fetch('/api/projects', { cache: 'no-store' }).then(r=>r.json());
          opts = (prAll?.result || []).map((p: { _id: string; title: string }) => ({ id: p._id, title: p.title }));
        }
        setProjectOptions([{ id: 'undecided', title: 'Not yet decided' }, ...opts]);
      } catch { setProjectOptions([]); }
    };
    run();
  }, [enrollment?.branchId?._id, enrollment?.branchId?.name, enrollment?.projectId?.title]);

  const submitProjectChoice = async (pid: string) => {
    if (!user?.email) return;
    setSavingProject(true);
    try {
      await fetch('/api/enrollments', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email, projectId: pid }) });
      // refresh enrollment
      const res = await fetch(`/api/enrollments?email=${encodeURIComponent(user.email)}`, { cache: 'no-store' });
      const d = await res.json();
      if (d?.result) setEnrollment(d.result);
    } finally {
      setSavingProject(false);
    }
  };

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    try {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    } catch { return ''; }
  };

  const timelineSteps = useMemo(() => {
    const now = new Date();
    const hasEnrollment = Boolean(enrollment?._id);
    const hasProject = Boolean(enrollment?.projectId?.title);
    const hasBatch = Boolean(enrollment?.batchId?.name);
    const endDateStr = enrollment?.batchId?.endDate || null;
    const endDate = endDateStr ? new Date(endDateStr) : null;
    const certAtStr = enrollment?.certificateDistributedAt || null;
    const certAt = certAtStr ? new Date(certAtStr) : null;
    const internshipCompleted = Boolean((endDate && endDate.getTime() <= now.getTime()) || certAt);

    const steps = [
      {
        key: 'enrolled',
        title: 'Enrollment completed',
        completed: hasEnrollment,
        date: enrollment?.createdAt || null,
      },
      {
        key: 'project',
        title: 'Project selected',
        completed: hasProject,
        date: null,
      },
      {
        key: 'batch',
        title: 'Batch assigned',
        completed: hasBatch,
        date: enrollment?.batchId?.startDate || null,
      },
      {
        key: 'internship',
        title: 'Internship completed',
        completed: internshipCompleted,
        date: certAtStr || endDateStr,
      },
      {
        key: 'certificate',
        title: 'Certificate distributed',
        completed: Boolean(enrollment?.certificateDistributedAt),
        date: enrollment?.certificateDistributedAt || null,
      },
    ];
    const firstPendingIdx = steps.findIndex((s) => !s.completed);
    return { steps, currentIdx: firstPendingIdx === -1 ? steps.length - 1 : firstPendingIdx };
  }, [enrollment]);

  const logout = () => {
    try { localStorage.removeItem('user'); } catch {}
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-4 tracking-tight mt-10">Candidate Dashboard</h1>
          {checking ? (
            <p className="text-lg text-slate-600 font-light inline-flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-slate-400/60 border-t-transparent rounded-full animate-spin"></span>
              Loading…
            </p>
          ) : user?.email ? (
            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
              <div className="flex items-center gap-4 text-left">
                {user.picture && (
                  <Image
                    src={user.picture}
                    alt={user.name || 'User'}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full border border-white/50 object-cover"
                  />
                )}
                <div>
                  <div className="text-slate-900 text-lg">Welcome{user.name ? `, ${user.name}` : ''}</div>
                  <div className="text-slate-600 text-sm">{user.email}</div>
                </div>
                <button onClick={logout} className="ml-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Logout</button>
              </div>
              <div className="mt-4 text-left text-slate-700">
                {enrollment ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl border border-slate-200 p-4">
                        <div className="text-slate-500 text-xs">Project</div>
                        <div className="text-slate-900 text-lg">{enrollment.projectId?.title || '—'}</div>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-4">
                        <div className="text-slate-500 text-xs">Batch</div>
                        <div className="text-slate-900 text-lg">{enrollment.batchId?.name || '—'}</div>
                        <div className="text-slate-600 text-sm">{enrollment.batchId?.schedule || 'Schedule: —'}</div>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-4">
                        <div className="text-slate-500 text-xs">Branch</div>
                        <div className="text-slate-900 text-lg">{enrollment.branchId?.name || '—'}</div>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-4">
                        <div className="text-slate-500 text-xs">Payment</div>
                        <div className="text-slate-900 text-lg capitalize">{enrollment.payment}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4">
                      <div className="text-slate-900 font-medium mb-3">Timeline</div>
                      <div className="space-y-4">
                        {timelineSteps.steps.map((step, idx) => {
                          const isCompleted = step.completed;
                          const isCurrent = idx === timelineSteps.currentIdx && !isCompleted;
                          return (
                            <div key={step.key} className="flex items-start gap-3">
                              <div className="relative mt-1">
                                {isCompleted ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                ) : (
                                  <span className={`inline-flex w-6 h-6 rounded-full border ${isCurrent ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-slate-50'}`}></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm ${isCompleted ? 'text-slate-900' : isCurrent ? 'text-indigo-900' : 'text-slate-500'}`}>{step.title}</div>
                                <div className="text-xs text-slate-500">
                                  {step.key === 'batch' && (enrollment.batchId?.schedule ? `Schedule: ${enrollment.batchId.schedule}` : '')}
                                  {step.key !== 'batch' && step.date ? formatDate(step.date) : (!step.date ? '' : '')}
                                  {!step.date && step.key === 'certificate' && !isCompleted ? 'Awaiting issuance' : ''}
                                </div>
                                {!isCompleted && step.key === 'project' && (
                                  <div className="mt-1">
                                    <a href="#choose-project" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-800 border border-orange-200">Select a project on this page</a>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="text-slate-900 font-medium mb-1">No enrollment found</div>
                    <p className="text-sm text-slate-600">Complete your onboarding to select a branch, project, and batch.</p>
                    <a href="/internships" className="mt-3 inline-block px-4 py-2 rounded-xl bg-slate-900/90 text-white">Start Onboarding</a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-slate-600 font-light">Sign in with Google to access your candidate dashboard.</p>
              <button onClick={()=>googleLogin()} className="px-5 py-3 rounded-2xl bg-slate-900/90 text-white border border-slate-800/30 hover:bg-slate-900 inline-flex items-center gap-2">
                {ssoLoading && <span className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" aria-hidden></span>}
                {ssoLoading ? 'Signing in…' : 'Login with Google'}
              </button>
            </div>
          )}
        </div>
      </section>

      {user?.email && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8">
            {(() => {
              const hasProject = Boolean(enrollment?.projectId?.title);
              const hasBatch = Boolean(enrollment?.batchId?.name);
              const hasPayment = Boolean(enrollment?.payment);
              const showOnboarding = !enrollment || (!hasProject && !hasBatch && !hasPayment);
              if (showOnboarding) {
                return (
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
                    <h3 className="text-xl font-medium text-slate-900 mb-2">Onboarding</h3>
                    <p className="text-slate-600">Start onboarding to select your project, batch, and complete payment.</p>
                    <a href="/internships" className="mt-3 inline-block px-4 py-2 rounded-xl bg-slate-900/90 text-white">Open</a>
                  </div>
                );
              }
              if (!hasProject && enrollment?.branchId?.name) {
                return (
                  <div id="choose-project" className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
                    <h3 className="text-xl font-medium text-slate-900 mb-2">Choose Project</h3>
                    <p className="text-slate-600">Pick a project for the &quot;{enrollment.branchId.name}&quot; branch.</p>
                    {projectOptions.length ? (
                      <div className="mt-4 flex items-end gap-3">
                        <div className="flex-1">
                          <label className="block text-xs text-slate-500 mb-1">Project</label>
                          <select
                            value={projectChoice}
                            onChange={(e)=>setProjectChoice(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900"
                          >
                            {projectOptions.map((p)=> (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>
                        <button onClick={()=>setProjectChoice('undecided')} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700" disabled={savingProject}>Cancel</button>
                        <button onClick={()=>submitProjectChoice(projectChoice)} className="px-4 py-2 rounded-xl bg-slate-900/90 text-white" disabled={savingProject}>{savingProject ? 'Saving…' : 'Save'}</button>
                      </div>
                    ) : (
                      <a href="/internships" className="mt-3 inline-block px-4 py-2 rounded-xl bg-slate-900/90 text-white">Open Onboarding</a>
                    )}
                  </div>
                );
              }
              // Fully onboarded: hide onboarding card
              return null;
            })()}
          </div>
        </section>
      )}

      {user?.email && (
        <a
          href="https://wa.me/916363602301?text=Hi%20Virtunex%2C%20I%20have%20a%20query."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact support on WhatsApp"
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-green-200 shadow-xl text-green-800 hover:bg-white"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 border border-green-200">
            <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
              <path d="M19.11 17.03c-.27-.14-1.56-.77-1.8-.86-.24-.1-.42-.14-.6.14-.18.27-.69.86-.84 1.03-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.53-.02-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.88 2.86 4.56 4.01.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.56-.64 1.78-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.32z"/>
              <path d="M26.6 5.4C23.9 2.7 20.2 1.2 16.3 1.2 8.4 1.2 2 7.6 2 15.5c0 2.5.7 4.9 2 7.1L2 30l7.6-2c2.1 1.1 4.5 1.7 6.9 1.7 7.9 0 14.3-6.4 14.3-14.3 0-3.9-1.5-7.6-4.2-10.3zM16.5 27.4c-2.2 0-4.4-.6-6.3-1.6l-.5-.3-4.5 1.2 1.2-4.4-.3-.5c-1.2-1.9-1.8-4.1-1.8-6.3 0-6.7 5.5-12.2 12.2-12.2 3.3 0 6.3 1.3 8.6 3.6 2.3 2.3 3.6 5.3 3.6 8.6-.1 6.7-5.6 12.2-12.2 12.2z"/>
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Any query? WhatsApp us</span>
            <span className="text-xs text-slate-600">+91 63636 02301</span>
          </div>
        </a>
      )}

      <Footer />
    </div>
  );
}


