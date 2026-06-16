'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const MODELS = [
  {
    id: 'realtor',
    label: 'The Realtor',
    tagline: 'Real Estate & Properties',
    desc: 'Warm, approachable look with natural lighting. Build instant trust with clients.',
    color: '#475569',
    textColor: '#475569',
    btnTextColor: '#fff',
    accent: '#F1F5F9',
    icon: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
    previewImg: '/hero/real-estate-4.webp',
    gallery: ['/hero/real-estate-1.webp', '/hero/real-estate-2.webp', '/hero/real-estate-3.webp', '/hero/real-estate-5.webp'],
  },
  {
    id: 'executive',
    label: 'The Executive',
    tagline: 'Legal & Consulting Excellence',
    desc: 'Dark charcoal boardroom. Commanding authority for law firms and C-suite professionals.',
    color: '#0F1419',
    textColor: '#0F1419',
    btnTextColor: '#fff',
    accent: '#E2E8F0',
    icon: 'M8 7h8M8 12h8M8 17h5M3 3h18v18H3z',
    previewImg: '/hero/firm-4.webp',
    gallery: ['/hero/firm-2.webp', '/hero/firm-3.webp', '/hero/firm-5.webp', '/hero/firm-1.webp'],
  },
  {
    id: 'analyst',
    label: 'The Analyst',
    tagline: 'Finance & Corporate Trust',
    desc: 'Clean, neutral precision. The portrait that wins fiduciary confidence on first sight.',
    color: '#0A66C2',
    textColor: '#0A66C2',
    btnTextColor: '#fff',
    accent: '#E8F1FB',
    icon: 'M3 21h18M5 21V8l7-5 7 5v13M10 21v-6h4v6',
    previewImg: '/hero/account-4.webp',
    gallery: ['/hero/account-3.webp', '/hero/account-5.webp', '/hero/account-1.webp', '/hero/account-2.webp'],
  },
  {
    id: 'innovator',
    label: 'The Innovator',
    tagline: 'Startups & Entrepreneurs',
    desc: "Modern, dynamic, forward-looking. The shot that says you're building the future.",
    color: '#741B7C',
    textColor: '#741B7C',
    btnTextColor: '#fff',
    accent: '#F3E5FF',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    previewImg: '/hero/startup-4.webp',
    gallery: ['/hero/startup-5.webp', '/hero/startup-1.webp', '/hero/startup-2.webp', '/hero/startup-3.webp'],
  },
];

const FAQS = [
  {
    q: 'What is an AI headshot generator?',
    a: 'An AI headshot generator uses artificial intelligence to transform your selfies into professional studio-quality portraits in seconds. ProFaceApp offers 4 distinct models—Realtor, Executive, Analyst, Innovator—each tuned for a specific industry and look.',
  },
  {
    q: 'How long does it take to generate AI headshots?',
    a: 'ProFaceApp delivers your finished headshots in 90 seconds or less. Upload 1–5 selfies, select your AI model, and your studio-grade portrait appears in your dashboard almost instantly.',
  },
  {
    q: 'Can I use AI headshots on LinkedIn?',
    a: 'Absolutely. AI-generated headshots are widely accepted on LinkedIn and other professional platforms. Our portraits are indistinguishable from high-end studio photos—and many hiring managers prefer their consistent, polished look.',
  },
  {
    q: 'How much does it cost compared to a real photographer?',
    a: 'A professional headshot session typically costs $200–$600. ProFaceApp starts at $29 one-time—and subscription plans give you unlimited regenerations. Teams save thousands per year.',
  },
  {
    q: 'Are my selfies and headshots private?',
    a: 'Yes. All uploads are encrypted in transit and at rest. We never share your photos with third parties and never use them to train AI models. Only you can access your generated headshots via your private dashboard.',
  },
  {
    q: 'What are the 4 AI models and which should I choose?',
    a: 'The Realtor is warm and approachable (real estate, property). The Executive is dark and commanding (law, consulting, C-suite). The Analyst is clean and precise (finance, accounting). The Innovator is modern and dynamic (startups, tech). Pick the model that matches your industry for the best results.',
  },
  {
    q: 'What selfies work best?',
    a: 'Upload 1–5 well-lit photos taken in good natural or indoor light, from slightly different angles. Front-facing, neutral background selfies give the strongest results—but even casual phone photos work well.',
  },
  {
    q: 'Can I regenerate if I don\'t like the result?',
    a: 'Yes. Pro and Max plans include unlimited regenerations. Try a different selfie, swap AI models, and get a new set in 90 seconds. Every attempt uses 1 credit (10 per generation).',
  },
];

export default function AIHeadshotsClient() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll<HTMLElement>(
      '.section-head, .step, .pcard, .pro-card, .quote, .model-card'
    );
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SiteNav />

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
            <h1>AI Headshot Generator</h1>
            <p className="lede">
              Upload a selfie. Choose your professional style. Get a <strong>studio-quality headshot in 90 seconds</strong> — no photographer, no studio, no waiting.
              Four AI models purpose-built for Real Estate, Legal, Finance &amp; Startups.
            </p>

            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
              <Link href="/?auth=signup" className="cta" style={{ maxWidth: 260 }}>
                <span>Get 1 Free Photo</span>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/>
                </svg>
              </Link>
              <Link href="/#pricing" className="btn-ghost-2" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 22px', borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1.5px solid #e3e6ea', color: '#0f1419' }}>
                See pricing
              </Link>
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

          {/* Mosaic */}
          <div className="hero-visual" aria-hidden="true">
            <div className="mosaic-grid">
              {[
                { img: '/hero/real-estate-1.webp', label: 'The Realtor', tagline: 'Real Estate', color: '#475569' },
                { img: '/hero/firm-2.webp', label: 'The Executive', tagline: 'Legal & Consulting', color: '#0F1419' },
                { img: '/hero/account-3.webp', label: 'The Analyst', tagline: 'Finance', color: '#0A66C2' },
                { img: '/hero/startup-5.webp', label: 'The Innovator', tagline: 'Startups', color: '#741B7C' },
              ].map(({ img, label, tagline, color }) => (
                <Link
                  key={label}
                  href="/?auth=signup"
                  className="mosaic-cell"
                  style={{ '--model-color': color } as React.CSSProperties}
                  tabIndex={0}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={label} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                  <div className="mosaic-overlay" style={{ background: `linear-gradient(to top, ${color}cc 0%, transparent 55%)` }}/>
                  <div className="mosaic-label">
                    <div>
                      <div className="mosaic-label-name">{label}</div>
                      <div className="mosaic-label-tagline">{tagline}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN AI HEADSHOT ── (SEO section) */}
      <section style={{ padding: '72px 28px', background: '#fff', borderTop: '1px solid #e3e6ea' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <span className="kicker">What is an AI Headshot?</span>
          <h2 style={{ fontSize: 'clamp(28px,3.6vw,40px)', fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 20px' }}>
            Professional headshots — without the studio
          </h2>
          <p style={{ fontSize: 17, color: '#57606e', lineHeight: 1.7, maxWidth: 720, margin: '0 auto 40px' }}>
            An AI headshot generator creates studio-quality professional portraits from your selfies using artificial intelligence.
            ProFaceApp analyzes your facial structure, applies professional lighting, wardrobe, and background — all tailored to your industry — and delivers a polished headshot in 90 seconds.
            No appointment. No photographer. No expensive studio session.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'left' }}>
            {[
              { n: '90s', label: 'Delivery time', sub: 'vs. days with a photographer' },
              { n: '$29', label: 'Starting price', sub: 'vs. $200–600 studio session' },
              { n: '4', label: 'AI Models', sub: 'Purpose-built per industry' },
              { n: '14k+', label: 'Professionals', sub: 'Already using ProFaceApp' },
            ].map(({ n, label, sub }) => (
              <div key={label} style={{ background: '#f4f6f9', borderRadius: 16, padding: '24px 20px', border: '1px solid #e3e6ea' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0a66c2', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#0f1419', margin: '8px 0 4px' }}>{label}</div>
                <div style={{ fontSize: 13, color: '#57606e' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 MODELS SHOWCASE ── */}
      <section className="models-section" id="models" style={{ padding: '72px 28px', background: '#f4f6f9', borderTop: '1px solid #e3e6ea' }}>
        <div className="section-head">
          <span className="kicker">Four AI Models</span>
          <h2>Choose the look that fits your industry</h2>
          <p>Each model is purpose-built for a specific professional world — different prompts, lighting, wardrobe and atmosphere.</p>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {MODELS.map(m => (
            <article
              key={m.id}
              className="model-card"
              style={{ '--mc': m.color, '--ma': m.accent } as React.CSSProperties}
            >
              <div className="mc-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.previewImg} alt={`${m.label} AI headshot example`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
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
                <Link
                  href="/?auth=signup"
                  className="mc-btn"
                  style={{ background: m.color, color: m.btnTextColor, borderColor: m.color, display: 'block', textAlign: 'center', textDecoration: 'none', padding: '10px 16px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: '1.5px solid', transition: 'all .25s' }}
                >
                  Generate as {m.label}
                </Link>
              </div>
            </article>
          ))}
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
            { n: '01', title: 'Choose your AI model', body: 'Pick from 4 styles: The Realtor, The Executive, The Analyst or The Innovator. Each generates a completely different professional look tuned to your industry.' },
            { n: '02', title: 'Upload selfies', body: '1–5 well-lit photos from different angles. Phone selfies work great — no professional camera needed.' },
            { n: '03', title: 'Download your headshot', body: 'Your polished AI headshot delivered to your dashboard in 90 seconds. Download in HD instantly.' },
          ].map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery" id="gallery" style={{ paddingTop: 72 }}>
        <div className="section-head">
          <span className="kicker">Gallery</span>
          <h2>Real selfies. Four distinct AI headshot styles.</h2>
          <p>Browse real examples generated by each AI model — 4 portraits per style.</p>
        </div>
        {MODELS.map(m => (
          <div key={m.id} style={{ maxWidth: 1200, margin: '0 auto 60px', padding: '0 0px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: m.color, flexShrink: 0 }}/>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: m.textColor, margin: 0 }}>{m.label}</h3>
              <span style={{ fontSize: 13, color: '#57606e' }}>— {m.desc}</span>
            </div>
            <div className="gallery-grid-new">
              {m.gallery.map((img, i) => (
                <figure key={i} className="gallery-item">
                  <div className="gallery-container" style={{ height: '100%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${m.label} AI headshot example ${i + 1}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                    <div className="gallery-color-bar" style={{ background: m.color, position: 'absolute', bottom: 0, left: 0, right: 0, height: 3 }}/>
                  </div>
                  <figcaption>{m.tagline}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 16, paddingBottom: 40 }}>
          <Link href="/?auth=signup" className="cta" style={{ maxWidth: 320, margin: '0 auto' }}>
            <span>Get Your Free Photo Now</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
          </Link>
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
          <p><strong>Free signup includes 10 credits</strong> (1 free professional AI headshot). Each additional generation costs 10 credits. Cancel anytime.</p>
        </div>
        <div className="pricing-cards">
          {[
            {
              plan: 'oneshot',
              name: 'One-shot',
              desc: 'Get 40 photos with one payment.',
              price: '$29',
              billed: 'One-time payment',
              btn: 'Buy One-shot',
              primary: false,
              features: ['40 photos · one payment', 'All 4 AI models included', 'Standard render queue', 'Private My Folders storage', 'HD downloads'],
            },
            {
              plan: 'pro',
              name: 'Pro',
              desc: 'Ideal for freelancers & job seekers.',
              price: '$39',
              billed: 'Billed $469/year',
              btn: 'Subscribe to Pro',
              primary: true,
              features: ['100 photos / month', 'All 4 AI models included', 'High-likeness AI rendering', 'Priority render queue', 'Private My Folders storage', 'HD downloads'],
            },
            {
              plan: 'max',
              name: 'Max',
              desc: 'For teams, agencies & heavy users.',
              price: '$79',
              billed: 'Billed $949/year',
              btn: 'Subscribe to Max',
              primary: false,
              features: ['250 photos / month', 'All 4 AI models included', 'Ultra-high likeness model', 'Instant priority rendering', 'Dedicated support', 'Private My Folders storage', 'HD downloads'],
            },
          ].map(p => (
            <article key={p.plan} className={`pcard${p.primary ? ' popular' : ''}`}>
              {p.primary && <div className="ribbon">Most popular</div>}
              <header>
                <h3>{p.name}</h3>
                <p className="pcard-desc">{p.desc}</p>
              </header>
              <div className="price">
                <span className="cur">$</span>
                <span className="amt">{p.price.replace('$', '')}</span>
                <span className="per">{p.plan === 'oneshot' ? '' : '/mo, billed yearly'}</span>
              </div>
              <p className="billed">{p.billed}</p>
              <Link href="/?auth=signup" className={`plan-btn${p.primary ? ' primary' : ''}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '14px 16px', borderRadius: 12, fontWeight: 600, fontSize: 15, border: p.primary ? 'none' : '1.5px solid #0f1419', color: p.primary ? '#fff' : '#0f1419', background: p.primary ? '#0a66c2' : '#fff', boxShadow: p.primary ? '0 12px 32px rgba(10,102,194,.32)' : 'none', transition: 'all .2s' }}>
                {p.btn}
              </Link>
              <ul className="features">
                {p.features.map(f => (
                  <li key={f}><span className="check">✓</span><span>{f}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOR TEAMS ── */}
      <section className="pros" id="teams">
        <div className="pros-inner">
          <div className="pros-head">
            <span className="kicker">For teams &amp; agencies</span>
            <h2>AI headshots for whole teams, in minutes.</h2>
            <p>Centralized billing, brand presets, and bulk credits priced per seat. Outfit your entire team in one afternoon.</p>
            <div className="pros-cta">
              <Link href="/?auth=signup" className="cta inline" style={{ textDecoration: 'none' }}>
                <span>Talk to sales</span>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
              </Link>
              <Link href="#pricing" className="btn-ghost-2 inline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', padding: '12px 22px', borderRadius: 14, fontWeight: 600, border: '1.5px solid #e3e6ea', color: '#0f1419' }}>
                See team pricing
              </Link>
            </div>
          </div>

          <div className="pro-grid">
            {[
              { title: 'Real estate agencies', desc: 'Outfit every agent with The Realtor model — warm, approachable, trust-building AI headshots.', bullets: ['Bulk pack: 30 agents / 90 photos', 'Brand-color background presets'], icon: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6' },
              { title: 'Law firms', desc: 'The Executive model delivers editorial-grade AI headshots for partner pages — conservative, courthouse-ready.', bullets: ['Conservative editorial style', 'NDA & private storage included'], icon: 'M8 7h8M8 12h8M8 17h5 M3 3h18v18H3z' },
              { title: 'Consultants & advisors', desc: 'Boardroom-grade AI headshots with The Executive model — authority matching your pitch deck.', bullets: ['Pitch-deck export presets', 'Square + 3:4 + 16:9 crops'], icon: 'M12 3v18M3 9h18M3 15h18' },
              { title: 'Accounting firms', desc: 'The Analyst model modernizes your team page — clean, precise, trustworthy AI headshots.', bullets: ['Warm or neutral lighting kits', 'Annual report-ready exports'], icon: 'M4 19V5l8 4 8-4v14M4 19h16' },
              { title: 'Financial advisors', desc: 'FINRA-friendly, regulatory-grade professional AI headshots with The Analyst model.', bullets: ['FINRA-friendly neutral framing', 'Re-shoot any advisor in 90 seconds'], icon: 'M3 21h18M5 21V8l7-5 7 5v13M10 21v-6h4v6' },
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
              <h3>Need more than 1,000 AI headshots a month?</h3>
              <p>We work with agencies and enterprises on custom packages, dedicated rendering capacity and SSO.</p>
            </div>
            <div className="pros-banner-stats">
              <div><strong>50%+</strong><span>cheaper than studio shoots</span></div>
              <div><strong>90 sec</strong><span>per headshot pack</span></div>
              <div><strong>1,200+</strong><span>teams onboarded</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="gallery" style={{ paddingTop: 72, paddingBottom: 72, background: '#fff', borderTop: '1px solid #e3e6ea' }}>
        <div className="section-head">
          <span className="kicker">What professionals say</span>
          <h2>Trusted by real estate agents, lawyers, and founders.</h2>
        </div>
        <div className="testimonials">
          {[
            { q: '"I outfitted all 24 agents in one afternoon with The Realtor AI headshot model. Every agent looks warm and trustworthy. We saved $6,000 this year."', name: 'Sophie M.', role: 'Real Estate Agency Manager', av: 'qav1' },
            { q: '"The Executive AI model is incredible — courthouse-ready portraits for our partners in two minutes instead of a half-day studio session."', name: 'James T.', role: 'Partner, Law Firm', av: 'qav2' },
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

      {/* ── FAQ ── */}
      <section style={{ padding: '72px 28px', background: '#f4f6f9', borderTop: '1px solid #e3e6ea' }} id="faq">
        <div className="section-head">
          <span className="kicker">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about AI headshot generation.</p>
        </div>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gap: 12 }}>
          {FAQS.map((item, i) => (
            <details
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #e3e6ea',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <summary style={{
                padding: '18px 22px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15,
                color: '#0f1419',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                listStyle: 'none',
              }}>
                {item.q}
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginLeft: 12 }}>
                  <path d="M6 8l4 4 4-4"/>
                </svg>
              </summary>
              <p style={{ padding: '0 22px 18px', color: '#57606e', fontSize: 15, lineHeight: 1.7, borderTop: '1px solid #e3e6ea', paddingTop: 14, margin: 0 }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <svg className="section-wave top dark" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,8 480,72 720,40 C960,8 1200,72 1440,40 L1440,80 L0,80 Z" fill="#e3eeff"/>
        </svg>
        <div className="fc-inner">
          <h2>Your AI headshot is 90 seconds away.</h2>
          <p>Four professional styles, studio quality, delivered instantly. No photographer. No waiting.</p>
          <Link href="/?auth=signup" className="cta" style={{ maxWidth: 380, margin: '0 auto', textDecoration: 'none' }}>
            <span>Generate your headshot free</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z"/></svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
