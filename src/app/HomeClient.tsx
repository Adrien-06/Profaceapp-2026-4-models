'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Suspense } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
type AuthTab = 'login' | 'signup';
type Billing = 'monthly' | 'yearly';
type ModelId = 'realtor' | 'executive' | 'analyst' | 'innovator';

const PRICES = {
  oneshot: { monthly: 29,  yearly: 29 },
  pro:     { monthly: 49, yearly: 39 },
  max:     { monthly: 99, yearly: 79 },
};

const BILLED = {
  oneshot: { monthly: 'One-time payment', yearly: 'One-time payment' },
  pro:     { monthly: 'Billed monthly', yearly: 'Billed $469/year' },
  max:     { monthly: 'Billed monthly', yearly: 'Billed $949/year' },
};

const GEN_STEPS = [
  { p: 10,  label: 'Uploading selfies securely…' },
  { p: 28,  label: 'Analyzing facial structure…' },
  { p: 52,  label: 'Running AI render pipeline…' },
  { p: 74,  label: 'Rendering studio lighting…' },
  { p: 92,  label: 'Color-grading three variants…' },
  { p: 100, label: 'Done.' },
];

const MODELS: Record<ModelId, {
  label: string;
  tagline: string;
  desc: string;
  color: string;
  textColor: string;
  btnTextColor: string;
  accent: string;
  icon: string;
  previewImg: string;
}> = {
  realtor: {
    label: 'The Realtor',
    tagline: 'Real Estate & Properties',
    desc: 'Warm, approachable look with natural lighting. Build instant trust with clients.',
    color: '#475569',
    textColor: '#475569',
    btnTextColor: '#fff',
    accent: '#F1F5F9',
    icon: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
    previewImg: '/hero/real-estate-4.webp',
  },
  executive: {
    label: 'The Executive',
    tagline: 'Legal & Consulting Excellence',
    desc: 'Dark charcoal boardroom. Commanding authority for law firms and C-suite professionals.',
    color: '#0F1419',
    textColor: '#0F1419',
    btnTextColor: '#fff',
    accent: '#E2E8F0',
    icon: 'M8 7h8M8 12h8M8 17h5M3 3h18v18H3z',
    previewImg: '/hero/firm-4.webp',
  },
  analyst: {
    label: 'The Analyst',
    tagline: 'Finance & Corporate Trust',
    desc: 'Clean, neutral precision. The portrait that wins fiduciary confidence on first sight.',
    color: '#0A66C2',
    textColor: '#0A66C2',
    btnTextColor: '#fff',
    accent: '#E8F1FB',
    icon: 'M3 21h18M5 21V8l7-5 7 5v13M10 21v-6h4v6',
    previewImg: '/hero/account-4.webp',
  },
  innovator: {
    label: 'The Innovator',
    tagline: 'Startups & Entrepreneurs',
    desc: "Modern, dynamic, forward-looking. The shot that says you're building the future.",
    color: '#741B7C',
    textColor: '#741B7C',
    btnTextColor: '#fff',
    accent: '#F3E5FF',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    previewImg: '/hero/startup-4.webp',
  },
};

const GALLERY_IMAGES: Record<ModelId, { img: string; cap: string }[]> = {
  realtor: [
    { img: '/hero/real-estate-1.webp', cap: 'Professional & Warm' },
    { img: '/hero/real-estate-2.webp', cap: 'Client-Ready' },
    { img: '/hero/real-estate-3.webp', cap: 'Trustworthy' },
    { img: '/hero/real-estate-5.webp', cap: 'Expert' },
  ],
  executive: [
    { img: '/hero/firm-2.webp', cap: 'Partner-Grade' },
    { img: '/hero/firm-3.webp', cap: 'Corporate Confidence' },
    { img: '/hero/firm-5.webp', cap: 'C-Suite Presence' },
    { img: '/hero/firm-1.webp', cap: 'Boardroom Authority' },
  ],
  analyst: [
    { img: '/hero/account-3.webp', cap: 'Clean Corporate' },
    { img: '/hero/account-5.webp', cap: 'Neutral Mastery' },
    { img: '/hero/account-1.webp', cap: 'Precision & Trust' },
    { img: '/hero/account-2.webp', cap: 'Fiduciary Confidence' },
  ],
  innovator: [
    { img: '/hero/startup-5.webp', cap: 'Creative Leader' },
    { img: '/hero/startup-1.webp', cap: 'Forward Thinking' },
    { img: '/hero/startup-2.webp', cap: 'Startup Founder' },
    { img: '/hero/startup-3.webp', cap: 'Tech Visionary' },
  ],
};

const MOSAIC_IMAGES: { model: ModelId; img: string; label: string }[] = [
  { model: 'realtor',   img: '/hero/real-estate-1.webp',  label: 'The Realtor' },
  { model: 'executive', img: '/hero/firm-2.webp',         label: 'The Executive' },
  { model: 'analyst',   img: '/hero/account-3.webp',      label: 'The Analyst' },
  { model: 'innovator', img: '/hero/startup-5.webp',      label: 'The Innovator' },
];

function AuthAutoOpen({ onOpen }: { onOpen: (tab: AuthTab) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const auth = params.get('auth');
    if (auth === 'login' || auth === 'signup') onOpen(auth);
  }, [params, onOpen]);
  return null;
}

export default function HomeClient() {
  const router = useRouter();
  const supabase = createClient();

  const [navOpen, setNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{email: string} | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setCurrentUser(user ? { email: user.email ?? '' } : null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ? { email: session.user.email ?? '' } : null);
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [genOpen, setGenOpen] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genLabel, setGenLabel] = useState('Initializing…');
  const [genDone, setGenDone] = useState(false);
  const [genPhotos, setGenPhotos] = useState<string[]>([]);
  const [genError, setGenError] = useState('');

  const [billing, setBilling] = useState<Billing>('monthly');
  const [files, setFiles] = useState<File[]>([]);
  const [isDrag, setIsDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '' });

  const [forgottenOpen, setForgottenOpen] = useState(false);
  const [forgottenEmail, setForgottenEmail] = useState('');
  const [forgottenLoading, setForgottenLoading] = useState(false);
  const [forgottenError, setForgottenError] = useState('');
  const [forgottenSuccess, setForgottenSuccess] = useState(false);

  const [selectedModel, setSelectedModel] = useState<ModelId>('executive');
  const [galleryTab, setGalleryTab] = useState<ModelId>('realtor');

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2600);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll<HTMLElement>(
      '.section-head, .step, .pcard, .pro-card, .quote, .g, .pros-banner, .upload-card, .model-card'
    );
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (navOpen) {
      const close = () => setNavOpen(false);
      document.addEventListener('click', close, { once: true });
      return () => document.removeEventListener('click', close);
    }
  }, [navOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setAuthOpen(false); setGenOpen(false); setContactOpen(false); setForgottenOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (authOpen || genOpen || contactOpen || forgottenOpen) ? 'hidden' : '';
  }, [authOpen, genOpen, contactOpen, forgottenOpen]);

  const openAuth = useCallback((tab: AuthTab) => {
    setAuthTab(tab); setAuthError(''); setAuthOpen(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setAuthLoading(true); setAuthError('');
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (error) { setAuthError(error.message); return; }
    setAuthOpen(false); toast('Welcome back!'); router.refresh();
  };

  const handleForgottenPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setForgottenLoading(true); setForgottenError(''); setForgottenSuccess(false);
    try {
      const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const res = await fetch(`${appUrl}/api/auth/send-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgottenEmail }),
      });
      setForgottenLoading(false);
      if (!res.ok) {
        const data = await res.json();
        setForgottenError(data.error || 'Failed to send reset email');
        return;
      }
      setForgottenSuccess(true);
      setForgottenEmail('');
      toast('Password reset email sent! Check your inbox.');
      setTimeout(() => { setForgottenOpen(false); setForgottenSuccess(false); }, 3000);
    } catch (err) {
      setForgottenLoading(false);
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setForgottenError(msg);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setAuthLoading(true); setAuthError('');
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      }
    });

    setAuthLoading(false);
    if (error) { setAuthError(error.message); return; }

    // Send verification email via Edge Function
    if (data.user?.id) {
      try {
        const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const emailResponse = await fetch(`${appUrl}/api/auth/send-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            user_id: data.user.id,
            full_name: name,
          }),
        });
        if (!emailResponse.ok) {
          const errorData = await emailResponse.text();
          console.error('Verification email error:', emailResponse.status, errorData);
        }
      } catch (err) {
        console.error('Failed to send verification email:', err);
      }
    }

    setAuthOpen(false);
    toast('Account created! Please check your email to verify your address.');
    router.refresh();
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = [...incoming].filter(f => /^image\/(jpeg|png|webp)$/.test(f.type) && f.size <= 20 * 1024 * 1024);
    if (!valid.length) { toast('Please upload JPG, PNG or WEBP under 20 MB.'); return; }
    setFiles(prev => [...prev, ...valid].slice(0, 12));
    toast(`${valid.length} photo${valid.length > 1 ? 's' : ''} added.`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { openAuth('signup'); return; }
    if (!files.length) { toast('Please upload at least one selfie first.'); return; }

    setGenError(''); setGenPhotos([]); setGenDone(false); setGenProgress(0);
    setGenLabel(GEN_STEPS[0].label);
    setGenOpen(true);

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i >= GEN_STEPS.length - 1) return;
      const s = GEN_STEPS[i++];
      setGenProgress(s.p); setGenLabel(s.label);
      timer = setTimeout(tick, 1500 + Math.random() * 1200);
    };
    tick();

    try {
      const file = files[0];
      const ext = (file.name.split('.').pop() || 'png').toLowerCase();
      const selfiePath = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('selfies')
        .upload(selfiePath, file, { contentType: file.type, upsert: false });
      if (upErr) throw new Error(upErr.message);

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selfiePath, model: selectedModel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      clearTimeout(timer!);
      setGenProgress(100); setGenLabel(GEN_STEPS[GEN_STEPS.length - 1].label);
      setGenPhotos(data.photos ?? []); setGenDone(true);
    } catch (err) {
      clearTimeout(timer!);
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setGenError(msg); setGenDone(true); toast(msg);
    }
  };

  const handlePlan = async (plan: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { openAuth('signup'); return; }
    toast(`Redirecting to checkout for ${plan} plan…`);
    const res = await fetch(`/api/checkout?plan=${plan}&billing=${billing}`);
    const { url, error } = await res.json();
    if (error) { toast(error); return; }
    if (url) window.location.href = url;
  };

  const activeModel = MODELS[selectedModel];

  return (
    <>
      <Suspense fallback={null}>
        <AuthAutoOpen onOpen={openAuth} />
      </Suspense>

      {/* ── NAV ── */}
      <header className="navbar" id="top">
        <div className="nav-container">
          <a href="#top" className="logo" aria-label="ProFaceApp home">
            <span className="logo-mark">
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B66E4"/>
                <circle cx="16" cy="13" r="5" fill="#fff"/>
                <path d="M6 28c1.8-5.5 6-8 10-8s8.2 2.5 10 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
            <span className="logo-text">ProFace<span className="logo-text-accent">App</span></span>
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`} id="nav-links">
            <a href="#models">Models</a>
            <a href="#pricing">Pricing</a>
            <a href="#teams">For teams</a>
            <a href="#gallery">Gallery</a>
            {currentUser && <a href="/dashboard" className="nav-dashboard-link">Dashboard</a>}
            <button className="btn-ghost" onClick={() => openAuth('login')}>Log in</button>
            <button className="btn-primary" onClick={() => openAuth('signup')}>Sign up</button>
          </nav>
          <button className={`burger${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(o => !o)} aria-label="Menu" aria-expanded={navOpen}>
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <svg className="wave-layer" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wG1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#d7e6fb"/>
                <stop offset="100%" stopColor="#eef5ff"/>
              </linearGradient>
            </defs>
            <path className="wave wave-1" d="M0,140 C220,260 420,40 700,160 C980,280 1200,80 1440,200 L1440,0 L0,0 Z" fill="url(#wG1)"/>
            <path className="wave wave-4" d="M0,800 L0,640 C260,720 540,620 820,700 C1100,780 1280,640 1440,720 L1440,800 Z" fill="#ffffff"/>
          </svg>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="dot"/>
              4 AI Models · Studio-grade in 90 seconds
            </span>
            <h1>Generate professional shots in seconds.</h1>
            <p className="lede">
              Upload a selfie and choose your style. <strong>Four distinct AI models</strong> for
              Real Estate, Legal, Finance, and Startups — studio-quality results without the studio.
            </p>

            <div className="upload-card">
              {/* Model Picker */}
              <div className="model-picker">
                <p className="picker-label">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" style={{ marginRight: 6, verticalAlign: 'middle' }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Choose your style
                </p>
                <div className="picker-grid">
                  {(Object.keys(MODELS) as ModelId[]).map(id => {
                    const m = MODELS[id];
                    const active = selectedModel === id;
                    return (
                      <button
                        key={id}
                        className={`picker-btn${active ? ' active' : ''}`}
                        style={active ? { borderColor: m.color, background: m.accent } as React.CSSProperties : {}}
                        onClick={() => setSelectedModel(id)}
                        title={m.desc}
                      >
                        <span className="picker-dot" style={{ background: m.color, border: m.color === '#F8FF1C' ? '1.5px solid rgba(0,0,0,.15)' : undefined }}/>
                        <span className="picker-label-group">
                          <span className="picker-name">{m.label}</span>
                          <span className="picker-sector">{m.tagline}</span>
                        </span>
                        {active && <span className="picker-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label
                className={`dropzone${isDrag ? ' is-drag' : ''}`}
                onDragEnter={e => { e.preventDefault(); setIsDrag(true); }}
                onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
                onDragLeave={() => setIsDrag(false)}
                onDrop={e => { e.preventDefault(); setIsDrag(false); addFiles(e.dataTransfer.files); }}
              >
                <div className="dropzone-inner" style={{ textAlign: 'center' }}>
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <p className="dz-title"><strong>Drop your selfies here</strong> or click to upload</p>
                  <p className="dz-sub">JPG, PNG or WEBP · 1 - 10 photos · 20MB max each</p>
                </div>
                <input ref={fileInputRef} type="file" multiple hidden accept="image/jpeg,image/png,image/webp" onChange={e => addFiles(e.target.files)}/>
              </label>

              {files.length > 0 && (
                <div className="thumb-row">
                  {files.slice(0, 6).map((f, i) => (
                    <div key={i} className="thumb" style={{ backgroundImage: `url(${URL.createObjectURL(f)})` }}/>
                  ))}
                  {files.length > 6 && <div className="thumb thumb-more">+{files.length - 6}</div>}
                </div>
              )}

              <button
                type="button"
                className="cta"
                style={{ background: activeModel.color, color: activeModel.btnTextColor }}
                onClick={handleGenerate}
              >
                <span>Generate as {activeModel.label}</span>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/>
                </svg>
              </button>

              <p className="micro">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
                </svg>
                Secure payments via Stripe · Your photos are private &amp; never used to train models.
              </p>
            </div>

            <div className="trust-row">
              <div className="avatars" aria-hidden="true">
                <span className="av av1"/><span className="av av2"/><span className="av av3"/><span className="av av4"/>
              </div>
              <div className="trust-copy">
                <div className="stars">★★★★★</div>
                <span><strong>14,200+</strong> professionals · rated 4.9/5</span>
              </div>
            </div>
          </div>

          {/* ── HERO MOSAIC ── */}
          <div className="hero-visual" aria-hidden="true">
            <div className="mosaic-grid">
              {MOSAIC_IMAGES.map(({ model, img, label }) => (
                <div
                  key={model}
                  className={`mosaic-cell${selectedModel === model ? ' mosaic-active' : ''}`}
                  onClick={() => setSelectedModel(model)}
                  style={{ '--model-color': MODELS[model].color } as React.CSSProperties}
                  aria-hidden="false"
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedModel(model)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={label} />
                  <div className="mosaic-overlay" style={{ background: `linear-gradient(to top, ${MODELS[model].color}cc 0%, transparent 55%)` }}/>
                  <div className="mosaic-label">
                    <div>
                      <div className="mosaic-label-name">{label}</div>
                      <div className="mosaic-label-tagline">{MODELS[model].tagline}</div>
                    </div>
                  </div>
                  {selectedModel === model && (
                    <div className="mosaic-badge" style={{ background: MODELS[model].color }}>✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mosaic-caption">
              <strong style={{ color: activeModel.textColor }}>{activeModel.label}</strong>
              <span> — {activeModel.desc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 MODELS SHOWCASE ── */}
      <section className="models-section" id="models">
        <div className="section-head">
          <span className="kicker">Four AI Models</span>
          <h2>Real selfies. Four distinct styles.</h2>
          <p>Each model is purpose-built for a specific professional world — different prompts, lighting, wardrobe and atmosphere.</p>
        </div>
        <div className="models-grid">
          {(Object.keys(MODELS) as ModelId[]).map(id => {
            const m = MODELS[id];
            const active = selectedModel === id;
            return (
              <article
                key={id}
                className={`model-card${active ? ' model-card-active' : ''}`}
                style={{ '--mc': m.color, '--ma': m.accent } as React.CSSProperties}
              >
                <div className="mc-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.previewImg} alt={m.label} />
                  <div className="mc-overlay" style={{ background: `linear-gradient(to top, ${m.color}ee 0%, transparent 55%)` }}>
                    <span className="mc-badge">{m.tagline}</span>
                  </div>
                </div>
                <div className="mc-body">
                  <div className="mc-icon" style={{ background: m.accent, color: m.textColor }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={m.icon}/>
                    </svg>
                  </div>
                  <h3 style={{ color: m.textColor }}>{m.label}</h3>
                  <p className="mc-sector">{m.tagline}</p>
                  <p className="mc-desc">{m.desc}</p>
                  <button
                    className="mc-btn"
                    style={active
                      ? { background: m.color, color: m.btnTextColor, borderColor: m.color }
                      : { background: 'transparent', color: m.textColor, borderColor: m.color }}
                    onClick={() => { setSelectedModel(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    {active ? '✓ Selected — scroll up to generate' : 'Choose this style'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="section-head">
          <span className="kicker">How it works</span>
          <h2>Studio results in three steps.</h2>
          <p>A real photoshoot takes a day. We take ninety seconds.</p>
        </div>
        <div className="steps">
          {[
            { n: '01', title: 'Choose your model', body: 'Pick from 4 AI styles: The Realtor, The Executive, The Analyst or The Innovator. Each generates a completely different professional look.' },
            { n: '02', title: 'Upload selfies',    body: '1–5 well-lit photos from different angles. Phone selfies work great.' },
            { n: '03', title: 'Download your shot', body: 'Your polished headshot delivered to your dashboard in 90 seconds. Download instantly.' },
          ].map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="pricing">
        <svg className="section-wave top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,72 480,8 720,40 C960,72 1200,8 1440,40 L1440,80 L0,80 Z" fill="#eef2f8"/>
        </svg>
        <div className="section-head">
          <span className="kicker">Pricing</span>
          <h2>Simple, transparent pricing.</h2>
          <p>Each generation costs <strong>10 credits</strong> and produces 1 professional photo in any of the 4 models. Cancel anytime.</p>
          <div className="billing-toggle">
            <button className={`bt-opt${billing === 'monthly' ? ' active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
            <button className={`bt-opt${billing === 'yearly' ? ' active' : ''}`} onClick={() => setBilling('yearly')}>
              Yearly <span className="save-pill">Save 20%</span>
            </button>
          </div>
        </div>
        <div className="pricing-cards">
          {(['oneshot', 'pro', 'max'] as const).map(plan => (
            <article key={plan} className={`pcard${plan === 'pro' ? ' popular' : ''}`}>
              {plan === 'pro' && <div className="ribbon">Most popular</div>}
              <header>
                <h3>{plan === 'oneshot' ? 'One-shot' : plan.charAt(0).toUpperCase() + plan.slice(1)}</h3>
                <p className="pcard-desc">{plan === 'oneshot' ? 'Get 40 photos with one payment.' : plan === 'pro' ? 'Ideal for freelancers & job seekers.' : 'For teams, agencies & heavy users.'}</p>
              </header>
              <div className="price">
                <span className="cur">$</span>
                <span className="amt">{PRICES[plan][billing]}</span>
                <span className="per">{plan === 'oneshot' ? '' : billing === 'yearly' ? '/mo, billed yearly' : '/month'}</span>
              </div>
              <p className="billed">{BILLED[plan][billing]}</p>
              <button className={`plan-btn${plan === 'pro' ? ' primary' : ''}`} onClick={() => handlePlan(plan)}>
                {plan === 'oneshot' ? 'Buy One-shot' : plan === 'pro' ? 'Subscribe to Pro' : 'Subscribe to Max'}
              </button>
              <ul className="features">
                {plan === 'oneshot' && <>
                  <li><span className="check">✓</span><span><strong>40 photos</strong> · one payment</span></li>
                  <li><span className="check">✓</span><span>All 4 AI models included</span></li>
                  <li><span className="check">✓</span><span>Standard render queue</span></li>
                  <li><span className="check">✓</span><span>Private My Folders storage</span></li>
                  <li><span className="check">✓</span><span>HD downloads</span></li>
                </>}
                {plan === 'pro' && <>
                  <li><span className="check">✓</span><span><strong>100 photos</strong> / month</span></li>
                  <li><span className="check">✓</span><span>All 4 AI models included</span></li>
                  <li><span className="check">✓</span><span>High-likeness AI rendering</span></li>
                  <li><span className="check">✓</span><span>Priority render queue</span></li>
                  <li><span className="check">✓</span><span>Private My Folders storage</span></li>
                  <li><span className="check">✓</span><span>HD downloads</span></li>
                </>}
                {plan === 'max' && <>
                  <li><span className="check">✓</span><span><strong>250 photos</strong> / month</span></li>
                  <li><span className="check">✓</span><span>All 4 AI models included</span></li>
                  <li><span className="check">✓</span><span>Ultra-high likeness model</span></li>
                  <li><span className="check">✓</span><span>Instant priority rendering</span></li>
                  <li><span className="check">✓</span><span>Dedicated support</span></li>
                  <li><span className="check">✓</span><span>Private My Folders storage</span></li>
                  <li><span className="check">✓</span><span>HD downloads</span></li>
                </>}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery" id="gallery">
        <div className="section-head">
          <span className="kicker">Gallery</span>
          <h2>Real selfies. Four distinct styles.</h2>
          <p>Browse examples from each AI model — 5 portraits per style.</p>
        </div>

        <div className="gallery-tabs">
          {(Object.keys(MODELS) as ModelId[]).map(id => {
            const m = MODELS[id];
            const active = galleryTab === id;
            return (
              <button
                key={id}
                className={`gtab${active ? ' gtab-active' : ''}`}
                style={active ? { borderColor: m.color, color: m.textColor, background: m.accent } as React.CSSProperties : {}}
                onClick={() => setGalleryTab(id)}
              >
                <span className="gtab-dot" style={{ background: m.color, border: m.color === '#F8FF1C' ? '1.5px solid rgba(0,0,0,.15)' : undefined }}/>
                {m.label}
              </button>
            );
          })}
        </div>

        <p className="gallery-tab-desc">
          <strong style={{ color: MODELS[galleryTab].textColor }}>{MODELS[galleryTab].label}</strong>
          {' '}—{' '}{MODELS[galleryTab].desc}
        </p>

        <div className="gallery-grid-new">
          {GALLERY_IMAGES[galleryTab].map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <figure key={`${galleryTab}-${i}`} className="gallery-item">
              <div className="gallery-container">
                <img src={item.img} alt={item.cap} />
                <div className="gallery-color-bar" style={{ background: MODELS[galleryTab].color }}/>
              </div>
              <figcaption>{item.cap}</figcaption>
            </figure>
          ))}
        </div>

        <div className="gallery-cta-row">
          <button
            className="cta inline"
            style={{ background: MODELS[galleryTab].color, color: MODELS[galleryTab].btnTextColor }}
            onClick={() => { setSelectedModel(galleryTab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span>Generate as {MODELS[galleryTab].label}</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
          </button>
        </div>

        <div className="testimonials">
          {[
            { q: '"I outfitted all 24 agents in one afternoon with The Realtor model. Every agent looks warm and trustworthy. We saved $6,000 this year."', name: 'Sophie M.', role: 'Real Estate Agency Manager', av: 'qav1' },
            { q: '"The Executive model is incredible — courthouse-ready portraits for our partners in two minutes instead of a half-day studio session."', name: 'James T.', role: 'Partner, Law Firm', av: 'qav2' },
            { q: '"The Innovator model perfectly captures our startup energy. Our About page finally looks as dynamic as our product."', name: 'Daniel R.', role: 'CEO & Founder', av: 'qav3' },
          ].map(t => (
            <blockquote key={t.name} className="quote">
              <p>{t.q}</p>
              <footer>
                <span className={`qav ${t.av}`}/>
                <span><strong>{t.name}</strong> · {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── TEAMS ── */}
      <section className="pros" id="teams">
        <div className="pros-inner">
          <div className="pros-head">
            <span className="kicker">For teams &amp; agencies</span>
            <h2>Headshots for whole teams, in minutes.</h2>
            <p>Centralized billing, brand presets, and bulk credits priced per seat.</p>
            <div className="pros-cta">
              <button className="cta inline" onClick={() => openAuth('signup')}>
                <span>Talk to sales</span>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
              </button>
              <a href="#pricing" className="btn-ghost-2 inline">See team pricing</a>
            </div>
          </div>

          <div className="pro-grid">
            {[
              { title: 'Real estate agencies', desc: 'Outfit every agent with The Realtor model — warm, approachable, trust-building portraits.', bullets: ['Bulk pack: 30 agents / 90 photos', 'Brand-color background presets'], icon: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6' },
              { title: 'Law firms', desc: 'The Executive model delivers editorial-grade portraits for partner pages — conservative, courthouse-ready.', bullets: ['Conservative editorial style', 'NDA & private storage included'], icon: 'M8 7h8M8 12h8M8 17h5 M3 3h18v18H3z' },
              { title: 'Consultants & advisors', desc: 'Boardroom-grade portraits with The Executive model — boardroom authority matching your pitch deck.', bullets: ['Pitch-deck export presets', 'Square + 3:4 + 16:9 crops'], icon: 'M12 3v18M3 9h18M3 15h18' },
              { title: 'Accounting firms', desc: 'The Analyst model modernizes your team page — clean, precise, trustworthy.', bullets: ['Warm or neutral lighting kits', 'Annual report-ready exports'], icon: 'M4 19V5l8 4 8-4v14M4 19h16' },
              { title: 'Financial advisors', desc: 'The Analyst model for FINRA-friendly, regulatory-grade professional shots.', bullets: ['FINRA-friendly neutral framing', 'Re-shoot any advisor in 90 seconds'], icon: 'M3 21h18M5 21V8l7-5 7 5v13M10 21v-6h4v6' },
              { title: 'Startups & Scale-ups', desc: 'The Innovator model for founders who want to look as forward-thinking as their product.', bullets: ['Day-one onboarding template', 'ATS & Slack avatar exports'], icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
            ].map(card => (
              <article key={card.title} className="pro-card">
                <div className="pro-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.icon}/>
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul className="pro-bullets">
                  {card.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="pros-banner">
            <div className="pros-banner-text">
              <h3>Need more than 1,000 credits a month?</h3>
              <p>We work with agencies and enterprises on custom packages, dedicated rendering capacity and SSO.</p>
            </div>
            <div className="pros-banner-stats">
              <div><strong>50%+</strong><span>cheaper than studio shoots</span></div>
              <div><strong>90 sec</strong><span>per pack of 3 photos</span></div>
              <div><strong>1,200+</strong><span>teams onboarded</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <svg className="section-wave top dark" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,8 480,72 720,40 C960,8 1200,72 1440,40 L1440,80 L0,80 Z" fill="#e3eeff"/>
        </svg>
        <div className="fc-inner">
          <h2>Your next headshot is ninety seconds away.</h2>
          <p>Four professional styles, delivered instantly. No studio, no waiting.</p>
          <button className="cta" style={{ maxWidth: 380, margin: '0 auto' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span>Choose your model &amp; generate</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <span className="logo-mark">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                  <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B66E4"/>
                  <circle cx="16" cy="13" r="5" fill="#fff"/>
                  <path d="M6 28c1.8-5.5 6-8 10-8s8.2 2.5 10 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              <span className="logo-text">ProFace<span className="logo-text-accent">App</span></span>
            </a>
            <p>AI professional headshots for people who don't have time for a photoshoot.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#models">AI Models</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#teams">For teams</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#how">How it works</a></li>
              <li><button style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:14, padding:0 }} onClick={() => openAuth('signup')}>Sign up</button></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Press kit</a></li>
              <li><button style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:14, padding:0, textAlign:'left' }} onClick={() => setContactOpen(true)}>Contact</button></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ProFaceApp · profaceapp.com — All rights reserved.</p>
          <p className="legal-small">ProFaceApp is an independent AI tool. Not affiliated with any social network.</p>
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      {authOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setAuthOpen(false); }}>
          <div className="modal-content" role="dialog" aria-modal="true">
            <button className="close-modal" onClick={() => setAuthOpen(false)}>×</button>
            <div className="modal-tabs">
              <button className={`tab-btn${authTab === 'login' ? ' active' : ''}`} onClick={() => { setAuthTab('login'); setAuthError(''); }}>Log in</button>
              <button className={`tab-btn${authTab === 'signup' ? ' active' : ''}`} onClick={() => { setAuthTab('signup'); setAuthError(''); }}>Sign up</button>
            </div>
            {authTab === 'login' && (
              <form className="auth-form active" onSubmit={handleLogin} onClick={e => e.stopPropagation()}>
                <h3>Welcome back</h3>
                <p className="auth-sub">Enter your details to access your folders and credits.</p>
                <label className="input-group"><span>Email</span><input name="email" type="email" placeholder="name@company.com" required /></label>
                <label className="input-group"><span>Password</span><input name="password" type="password" placeholder="••••••••" required /></label>
                {authError && <p className="auth-error">{authError}</p>}
                <button type="submit" className="cta" disabled={authLoading}><span>{authLoading ? 'Signing in…' : 'Log in'}</span></button>
                <p className="auth-foot">
                  <button type="button" style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:14, textDecoration:'underline' }} onClick={() => setForgottenOpen(true)}>Forgot password?</button>
                </p>
                <p className="auth-foot">No account? <button type="button" style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:'inherit' }} onClick={() => { setAuthTab('signup'); setAuthError(''); }}>Create one</button></p>
              </form>
            )}
            {authTab === 'signup' && (
              <form className="auth-form active" onSubmit={handleSignup} onClick={e => e.stopPropagation()}>
                <h3>Create your account</h3>
                <p className="auth-sub">Start generating studio-quality headshots today.</p>
                <label className="input-group"><span>Full name</span><input name="name" type="text" placeholder="Jane Doe" required /></label>
                <label className="input-group"><span>Email</span><input name="email" type="email" placeholder="name@company.com" required /></label>
                <label className="input-group"><span>Password</span><input name="password" type="password" placeholder="Create a password (min 8 chars)" minLength={8} required /></label>
                {authError && <p className="auth-error">{authError}</p>}
                <button type="submit" className="cta" disabled={authLoading}><span>{authLoading ? 'Creating account…' : 'Create account'}</span></button>
                <p className="auth-foot">Already have an account? <button type="button" style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:'inherit' }} onClick={() => { setAuthTab('login'); setAuthError(''); }}>Log in</button></p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── GENERATE MODAL ── */}
      {genOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setGenOpen(false); }}>
          <div className="modal-content gen" role="dialog" aria-modal="true">
            <button className="close-modal" onClick={() => setGenOpen(false)}>×</button>
            {!genDone ? (
              <div>
                <div className="gen-model-badge" style={{ background: activeModel.accent, color: activeModel.textColor }}>
                  {activeModel.label} · {activeModel.tagline}
                </div>
                <h3>Generating your {activeModel.label} pack…</h3>
                <p className="auth-sub">Our AI is rendering your studio-quality pack. Usually 30–90 seconds.</p>
                <div className="progress"><div className="progress-bar" style={{ width: `${genProgress}%`, background: activeModel.color }}/></div>
                <p className="progress-label">{genLabel}</p>
              </div>
            ) : genError ? (
              <div>
                <h3>Generation failed</h3>
                <p className="auth-sub">{genError} Your credits have been refunded.</p>
                <div className="result-actions">
                  <button className="btn-ghost-2" onClick={() => setGenOpen(false)}>Close</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="gen-model-badge" style={{ background: activeModel.accent, color: activeModel.textColor }}>
                  {activeModel.label} · {activeModel.tagline}
                </div>
                <h3>Your headshot is ready ✨</h3>
                <p className="auth-sub">Saved to <strong>My Folders</strong>. Download or view your photo.</p>
                <div className="result-grid">
                  {genPhotos.map((url, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={url} alt={`Headshot ${i + 1}`} style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }}/>
                  ))}
                </div>
                <div className="result-actions">
                  <button className="cta" style={{ background: activeModel.color, color: activeModel.btnTextColor }} onClick={() => { setGenOpen(false); router.push('/dashboard'); }}>
                    <span>Go to My Folders</span>
                  </button>
                  <button className="btn-ghost-2" onClick={() => setGenOpen(false)}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CONTACT MODAL ── */}
      {contactOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setContactOpen(false); }}>
          <div className="modal-content" role="dialog" aria-modal="true">
            <button className="close-modal" onClick={() => setContactOpen(false)}>×</button>
            <h3>Get in touch</h3>
            <p className="auth-sub">Let's talk about how ProFaceApp can help your team.</p>
            <form className="auth-form active" onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(contactForm),
                });
                if (res.ok) {
                  window.location.href = `mailto:support@profaceapp.com?subject=Contact from ${encodeURIComponent(contactForm.name)}&body=Name: ${encodeURIComponent(contactForm.name)}%0AEmail: ${encodeURIComponent(contactForm.email)}`;
                  toast(`Message sent! We'll contact you at ${contactForm.email}`);
                  setContactForm({ name: '', email: '' });
                  setContactOpen(false);
                }
              } catch {
                toast('Failed to send message');
              }
            }} onClick={e => e.stopPropagation()}>
              <label className="input-group"><span>Name</span><input type="text" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))} required /></label>
              <label className="input-group"><span>Email</span><input type="email" placeholder="you@company.com" value={contactForm.email} onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))} required /></label>
              <button type="submit" className="cta"><span>Send message</span></button>
            </form>
          </div>
        </div>
      )}

      {/* ── FORGOTTEN PASSWORD MODAL ── */}
      {forgottenOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setForgottenOpen(false); }}>
          <div className="modal-content" role="dialog" aria-modal="true">
            <button className="close-modal" onClick={() => setForgottenOpen(false)}>×</button>
            {!forgottenSuccess ? (
              <form className="auth-form active" onSubmit={handleForgottenPassword} onClick={e => e.stopPropagation()}>
                <h3>Reset your password</h3>
                <p className="auth-sub">Enter your email address and we'll send you a link to reset your password.</p>
                <label className="input-group"><span>Email</span><input type="email" placeholder="name@company.com" value={forgottenEmail} onChange={e => setForgottenEmail(e.target.value)} required /></label>
                {forgottenError && <p className="auth-error">{forgottenError}</p>}
                <button type="submit" className="cta" disabled={forgottenLoading}><span>{forgottenLoading ? 'Sending…' : 'Send reset link'}</span></button>
                <p className="auth-foot">
                  <button type="button" style={{ background:'none', border:'none', color:'var(--blue)', cursor:'pointer', fontSize:'inherit' }} onClick={() => { setForgottenOpen(false); setForgottenEmail(''); setForgottenError(''); }}>Back to login</button>
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ color: '#22c55e' }}>✓ Email sent!</h3>
                <p className="auth-sub">Check your email for a password reset link. It will expire in 1 hour.</p>
                <button type="button" className="btn-ghost-2" onClick={() => { setForgottenOpen(false); setForgottenSuccess(false); setForgottenEmail(''); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`toast${toastVisible ? ' show' : ''}`} role="status" aria-live="polite">
        {toastMsg}
      </div>
    </>
  );
}
