'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SiteNav() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (navOpen) {
      const close = () => setNavOpen(false);
      document.addEventListener('click', close, { once: true });
      return () => document.removeEventListener('click', close);
    }
  }, [navOpen]);

  return (
    <header className="navbar" id="top">
      <div className="nav-container">
        <Link href="/" className="logo" aria-label="ProFaceApp home">
          <span className="logo-mark">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B66E4"/>
              <circle cx="16" cy="13" r="5" fill="#fff"/>
              <path d="M6 28c1.8-5.5 6-8 10-8s8.2 2.5 10 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </span>
          <span className="logo-text">ProFace<span className="logo-text-accent">App</span></span>
        </Link>
        <nav className={`nav-links${navOpen ? ' open' : ''}`} id="nav-links">
          <Link href="/#models">Models</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#teams">For teams</Link>
          <Link href="/ai-headshots">AI Headshots</Link>
          <Link href="/?auth=login" className="btn-ghost">Log in</Link>
          <Link href="/?auth=signup" className="btn-primary">Sign up</Link>
        </nav>
        <button
          className={`burger${navOpen ? ' open' : ''}`}
          onClick={() => setNavOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={navOpen}
        >
          <span/><span/><span/>
        </button>
      </div>
    </header>
  );
}
