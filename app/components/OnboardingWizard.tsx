'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

type PaymentChoice = 'partial' | 'full' | null;

interface ApiBatch {
  _id: string;
  name: string;
  status: string;
  capacity: number;
  enrolledCount?: number;
  schedule?: string;
}

const dummyProjects = [
  { id: 'saas-dashboard', title: 'SaaS Analytics Dashboard' },
  { id: 'mobile-commerce', title: 'Mobile Commerce App' },
  { id: 'cloud-automation', title: 'Cloud Infra Automation' },
  { id: 'ai-support-bot', title: 'AI Support Bot' },
  { id: 'undecided', title: 'Not yet decided' },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState<number>(1);
  const STORAGE_KEY = 'internshipFormV1';
  const formRef = useRef<HTMLDivElement | null>(null);

  // Step 1: Basic details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [college, setCollege] = useState('');
  const [yop, setYop] = useState('2025');
  const [branchId, setBranchId] = useState('');
  const [availableBranches, setAvailableBranches] = useState<{ _id: string; name: string }[]>([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);

  // Step 2: Project selection
  const [projectId, setProjectId] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<{ id: string; title: string }[]>([]);

  // Step 3: Batch selection
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [availableBatchesFromApi, setAvailableBatchesFromApi] = useState<ApiBatch[]>([]);

  // Step 4: Payment
  const [payment, setPayment] = useState<PaymentChoice>(null);
  const [precheckMsg, setPrecheckMsg] = useState<string>('');
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState('');
  const [dataError, setDataError] = useState('');

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  }, [email]);

  const whatsappDigits = useMemo(() => whatsapp.replace(/\D/g, ''), [whatsapp]);
  const isWhatsappValid = useMemo(() => whatsappDigits.length === 10, [whatsappDigits]);

  // Note: selected project and batch details can be derived on demand where needed

  const canGoNext = useMemo(() => {
    if (step === 1) return Boolean(fullName && college && yop && isWhatsappValid && emailVerified && branchId);
    if (step === 2) return Boolean(projectId);
    if (step === 3) return Boolean(selectedBatchId) || availableBatchesFromApi.length === 0;
    if (step === 4) return Boolean(payment);
    return true;
  }, [step, fullName, college, yop, isWhatsappValid, emailVerified, branchId, projectId, selectedBatchId, payment]);

  const normalize = (val: string) => (val || '').trim().toLowerCase();

  const checkVerification = useCallback(() => {
    if (!isEmailValid) {
      setEmailVerified(false);
      setAuthEmail('');
      return;
    }
    try {
      setCheckingVerification(true);
      fetch('/api/users/me').then((response) => response.ok ? response.json() : null).then((data) => {
        const signedInEmail = normalize(data?.user?.email || '');
        setAuthEmail(signedInEmail);
        setEmailVerified(Boolean(signedInEmail && signedInEmail === normalize(email)));
      }).catch(() => {
        setAuthEmail('');
        setEmailVerified(false);
      }).finally(() => setCheckingVerification(false));
    } catch {
      setAuthEmail('');
      setEmailVerified(false);
      setCheckingVerification(false);
    }
  }, [email, isEmailValid]);

  useEffect(() => {
    // If returned from Auth0 on same page, process hash silently
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      try { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch {}
      setSsoLoading(true);
      fetch('/api/users/me').then((response) => response.ok ? response.json() : null).then((data) => {
        setSsoLoading(false);
        if (data?.user?.email) {
          setAuthEmail(data.user.email);
          setEmail(data.user.email);
          setEmailVerified(true);
          // Clean the hash from URL
          try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch {}
          // Smooth scroll back to form

        }
      });
    } else {
      checkVerification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Preliminary check: if verified email exists in enrollment, show a flag
  useEffect(() => {
    const run = async () => {
      try {
        if (!emailVerified || !authEmail) { setPrecheckMsg(''); return; }
        const res = await fetch(`/api/enrollments?email=${encodeURIComponent(authEmail)}`);
        const d = await res.json();
        if (d?.exists) {
          setPrecheckMsg('You are already registered. You can go to the dashboard.');
          setAlreadyRegistered(true);
        } else {
          setPrecheckMsg('');
          setAlreadyRegistered(false);
        }
      } catch { setPrecheckMsg(''); }
    };
    run();
  }, [emailVerified, authEmail]);

  // Restore saved form state on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const saved = JSON.parse(raw || '{}') as Partial<{
        fullName: string;
        email: string;
        whatsapp: string;
        college: string;
        yop: string;
        branchId: string;
      }>;
      if (saved.fullName) setFullName(saved.fullName);
      if (saved.email) setEmail(saved.email);
      if (saved.whatsapp) setWhatsapp(saved.whatsapp);
      if (saved.college) setCollege(saved.college);
      if (saved.yop) setYop(saved.yop);
      if (saved.branchId) setBranchId(saved.branchId);
    } catch {
      // ignore
    }
    // Run a verification check after restoring email
    setTimeout(() => checkVerification(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist form state when fields change
  useEffect(() => {
    try {
      const payload = JSON.stringify({ fullName, email, whatsapp, college, yop, branchId });
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore
    }
  }, [fullName, email, whatsapp, college, yop, branchId]);

  // Load branches
  useEffect(() => {
    fetch('/api/branches').then(r=>r.json()).then((d)=>{
      if (d?.error) throw new Error(d.error);
      setAvailableBranches(d.result || []);
    }).catch(()=>setDataError('Registration data is unavailable. Configure MONGODB_URI on the server, then refresh this page.'));
  }, []);

  // Load projects when branch changes
  useEffect(() => {
    if (!branchId) { setFilteredProjects([]); return; }
    fetch(`/api/projects?branch=${branchId}`).then(r=>r.json()).then((d)=>{
      const mapped = (d.result || []).map((p: { _id: string; title: string }) => ({ id: p._id, title: p.title }));
      setFilteredProjects([{ id: 'undecided', title: 'Not yet decided' }, ...mapped]);
    }).catch(()=>{
      setFilteredProjects([]);
    });
  }, [branchId]);

  // Load batches (available only)
  useEffect(() => {
    fetch('/api/batches')
      .then((r) => r.json())
      .then((d) => {
      if (d?.error) throw new Error(d.error);
        const list: ApiBatch[] = Array.isArray(d?.result) ? d.result : [];
        const onlyAvailable = list.filter((b) => ['UPCOMING', 'ACTIVE', 'available'].includes(b.status || 'available'));
        setAvailableBatchesFromApi(onlyAvailable);
      })
      .catch(() => setDataError('Registration data is unavailable. Configure MONGODB_URI on the server, then refresh this page.'));
  }, []);

  const goNext = () => {
    if (!canGoNext) return;
    // Final submission on step 4 -> step 5
    if (alreadyRegistered) { setShowRegisteredModal(true); return; }
    if (step === 4) {
      const payload = {
        fullName,
        email: authEmail || email,
        picture: '',
        whatsapp: whatsappDigits,
        college,
        yop,
        branchId,
        projectId,
        batchId: selectedBatchId && /^[a-f\d]{24}$/i.test(selectedBatchId) ? selectedBatchId : undefined,
        payment,
      } as const;
      // First check if enrollment already exists (race-safe optimistic check)
      fetch(`/api/enrollments?email=${encodeURIComponent(payload.email)}`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.exists) { setShowRegisteredModal(true); return; }
          return fetch('/api/enrollments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(async (r) => {
              if (r.status === 409) { setStep(5); return; }
              if (!r.ok) { const data = await r.json().catch(() => null); throw new Error(data?.error || 'Registration failed'); }
              setStep(5);
            });
        })
        .catch((error: unknown) => setSubmissionError(error instanceof Error ? error.message : 'Registration failed. Configure the database and try again.'));
    } else {
      setStep((s) => Math.min(5, s + 1));
    }
  };

  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div ref={formRef} className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl border border-white/30">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Internship Onboarding</h3>
          <p className="text-slate-600 mt-2">Complete the steps to reserve your slot and get started.</p>
          {precheckMsg && (
            <p className="mt-2 text-sm text-rose-700 bg-rose-50 inline-block px-3 py-1.5 rounded-xl border border-rose-200">{precheckMsg}</p>
          )}
          {submissionError && <p className="mt-2 text-sm text-rose-300 bg-rose-950/40 inline-block px-3 py-1.5 rounded-xl border border-rose-800">{submissionError}</p>}
          {dataError && <p className="mt-2 text-sm text-amber-200 bg-amber-950/40 inline-block px-3 py-1.5 rounded-xl border border-amber-800">{dataError}</p>}
        </div>
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 border border-white/40 shadow-sm">
          <span className="text-xs font-medium text-slate-600 tracking-wide">Step {step} of 5</span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className={`h-1.5 rounded-full ${i <= step ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
        ))}
      </div>

      {showRegisteredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-left">
            <h5 className="text-lg font-medium text-slate-900 mb-2">You are already registered</h5>
            <p className="text-slate-600 mb-4">We found an existing enrollment for {authEmail || email}. You can go to your dashboard to view details.</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setShowRegisteredModal(false)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">Close</button>
              <Link href="/dashboard/candidate" className="px-4 py-2 rounded-xl bg-slate-900/90 text-white">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      {step === 1 && (
        <div>
          <h4 className="text-xl font-medium text-slate-900 mb-6">Your details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full name</label>
              <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Google verification</label>
              <div className="flex flex-col gap-2">
                {!emailVerified ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { window.location.href = '/login?returnTo=/internships'; }}
                      className={`px-3 py-2 rounded-2xl text-sm border transition whitespace-nowrap bg-slate-900/90 text-white border-slate-800/30 hover:bg-slate-900 inline-flex items-center gap-2`}
                    >
                      {ssoLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></span>
                          Verifying…
                        </>
                      ) : (
                        <>Verify with Google</>
                      )}
                    </button>
                    <p className="text-xs text-slate-500">This will be your login credential.</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">Verified: {authEmail || email}</span>
                    <button
                      type="button"
                      onClick={() => { setEmailVerified(false); setAuthEmail(''); setEmail(''); setSsoLoading(false); }}
                      className="px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xl border border-white/40 text-slate-700 text-xs font-medium hover:bg-white transition"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp number</label>
              <input value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value.replace(/\D/g, '').slice(0,10))} className={`w-full px-4 py-3 rounded-2xl bg-white/80 border ${whatsapp && !isWhatsappValid ? 'border-rose-300 focus:ring-rose-300' : 'border-white/40 focus:ring-slate-300'} text-slate-900 focus:outline-none focus:ring-2`} placeholder="10-digit number" />
              {whatsapp && !isWhatsappValid && (
                <p className="mt-2 text-sm text-rose-600">Enter a 10-digit WhatsApp number.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">College name</label>
              <input value={college} onChange={(e)=>setCollege(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Your College" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Year of passing</label>
              <select value={yop} onChange={(e)=>setYop(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300">
                {['2024','2025','2026','2027','2028'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Branch</label>
              <select value={branchId} onChange={(e)=>setBranchId(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/40 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300">
                <option value="">Select branch</option>
                {availableBranches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4 className="text-xl font-medium text-slate-900 mb-6">Select a project</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(filteredProjects.length ? filteredProjects : dummyProjects).map((p) => (
              <button
                key={p.id}
                onClick={() => setProjectId(p.id)}
                className={`text-left bg-white/70 backdrop-blur-xl rounded-2xl p-5 border ${projectId===p.id ? 'border-slate-800' : 'border-white/40'} hover:border-slate-400 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-900 font-medium">{p.title}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${projectId===p.id ? 'bg-slate-800' : 'bg-slate-300'}`}></span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">You can change this later with your mentor.</p>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4 className="text-xl font-medium text-slate-900 mb-6">Batch selection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(availableBatchesFromApi.length
              ? availableBatchesFromApi.map((b) => ({
                  id: b._id,
                  label: b.name,
                  timeWindow: b.schedule || '—',
                  capacity: b.capacity || 0,
                  enrolled: b.enrolledCount || 0,
                }))
              : []
            ).map((b) => {
              const remaining = Math.max(0, (b.capacity || 0) - (b.enrolled || 0));
              const isSelected = selectedBatchId === b.id;
              const status = remaining <= 3 ? 'low' : remaining <= 8 ? 'medium' : 'high';
              const badgeClasses = status === 'low'
                ? 'bg-rose-100 text-rose-700 border-rose-200'
                : status === 'medium'
                ? 'bg-amber-100 text-amber-700 border-amber-200'
                : 'bg-emerald-100 text-emerald-700 border-emerald-200';
              const barClasses = status === 'low' ? 'bg-rose-500' : status === 'medium' ? 'bg-amber-500' : 'bg-emerald-500';
              const borderEmphasis = isSelected
                ? 'border-2 border-slate-900 ring-2 ring-slate-900/10'
                : status === 'low'
                ? 'border border-rose-300'
                : status === 'medium'
                ? 'border border-amber-200'
                : 'border border-white/40';
              const badgeText = status === 'low' ? `Only ${remaining} left` : status === 'medium' ? 'Filling fast' : 'Seats available';
              const pct = b.capacity > 0 ? Math.min(100, Math.round(((b.enrolled || 0) / b.capacity) * 100)) : 0;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBatchId(b.id)}
                  className={`text-left bg-white/70 backdrop-blur-xl rounded-2xl p-5 ${borderEmphasis} hover:border-slate-400 transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-slate-900 font-medium">{b.label}</div>
                      <div className="text-slate-600 text-sm">{b.timeWindow}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeClasses}`}>{badgeText}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">Enrolled: {b.enrolled}/{b.capacity}</span>
                    <span className={`${status === 'low' ? 'text-rose-600' : status === 'medium' ? 'text-amber-600' : 'text-emerald-600'} font-medium`}>Remaining: {remaining}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${barClasses}`} style={{ width: `${pct}%` }}></div>
                  </div>
                </button>
              );
            })}
          </div>
          {!availableBatchesFromApi.length && (
            <p className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">
              No batches are configured yet. You can submit your application and the team will assign a batch after review.
            </p>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h4 className="text-xl font-medium text-slate-900 mb-6">Payment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setPayment('partial')}
              className={`text-left bg-white/70 backdrop-blur-xl rounded-2xl p-6 border ${payment==='partial' ? 'border-slate-800' : 'border-white/40'} hover:border-slate-400 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900 font-medium">Partial Payment</div>
                  <div className="text-slate-600 text-sm">Pay ₹500 now, balance later</div>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${payment==='partial' ? 'bg-slate-800' : 'bg-slate-300'}`}></span>
              </div>
            </button>
            <button
              onClick={() => setPayment('full')}
              className={`text-left bg-white/70 backdrop-blur-xl rounded-2xl p-6 border ${payment==='full' ? 'border-slate-800' : 'border-white/40'} hover:border-slate-400 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900 font-medium">Full Payment</div>
                  <div className="text-slate-600 text-sm">Pay ₹3500 now</div>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${payment==='full' ? 'bg-slate-800' : 'bg-slate-300'}`}></span>
              </div>
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-4">Payments are simulated for this demo.</p>
        </div>
      )}

      {step === 5 && (
        <div className="text-center">
          <h4 className="text-2xl md:text-3xl font-light text-slate-900 mb-4 tracking-tight">Enrollment completed!</h4>
          <p className="text-slate-600 max-w-xl mx-auto mb-6">
            Your enrollment is complete. You can go to your dashboard now. Our HR team will get in touch shortly at <span className="font-medium">{email || 'your email'}</span>.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/candidate" className="group relative bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-500 font-medium inline-flex items-center">
              <span className="relative z-10 flex items-center justify-center">
                Go to Dashboard
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link href="/" className="group relative bg-white/80 backdrop-blur-md text-slate-900 px-8 py-4 rounded-2xl shadow-lg border border-white/30 hover:bg-white hover:-translate-y-1 transition-all duration-500 font-medium inline-flex items-center">
              <span className="relative z-10 flex items-center justify-center">Back to Home</span>
            </Link>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={goPrev} disabled={step===1} className="px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          Back
        </button>
        {step < 5 ? (
          <button onClick={goNext} disabled={!canGoNext} title={alreadyRegistered ? 'Email already registered. Choose different email or go to Dashboard' : ''} className="group relative bg-slate-900/90 backdrop-blur-md text-white px-8 py-3 rounded-2xl shadow-lg border border-slate-800/20 hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 font-medium inline-flex items-center">
            <span className="relative z-10 flex items-center justify-center">
              Continue
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        ) : (
          <div className="text-slate-500 text-sm">Registration complete</div>
        )}
      </div>
    </div>
  );
}
