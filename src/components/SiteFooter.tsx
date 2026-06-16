'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B66E4"/>
                <circle cx="16" cy="13" r="5" fill="#fff"/>
                <path d="M6 28c1.8-5.5 6-8 10-8s8.2 2.5 10 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
            <span className="logo-text">ProFace<span className="logo-text-accent">App</span></span>
          </Link>
          <p>AI professional headshots for people who don&apos;t have time for a photoshoot.</p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li><Link href="/#models">AI Models</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/#teams">For teams</Link></li>
            <li><Link href="/ai-headshots">AI Headshots</Link></li>
            <li><Link href="/#how">How it works</Link></li>
            <li><Link href="/?auth=signup">Sign up</Link></li>
          </ul>
        </div>
        <div>
          <h4>AI Headshots</h4>
          <ul>
            <li><Link href="/ai-headshots">AI Headshot Generator</Link></li>
            <li><Link href="/#models">The Realtor</Link></li>
            <li><Link href="/#models">The Executive</Link></li>
            <li><Link href="/#models">The Analyst</Link></li>
            <li><Link href="/#models">The Innovator</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Press kit</Link></li>
            <li><Link href="/?contact=1">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of service</Link></li>
            <li><Link href="/legal-notice">Legal notice</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ProFaceApp · profaceapp.com — All rights reserved.</p>
        <p className="legal-small">ProFaceApp is an independent AI tool. Not affiliated with any social network.</p>
      </div>
    </footer>
  );
}
