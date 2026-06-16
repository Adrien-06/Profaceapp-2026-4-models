'use client';

import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e3e6ea',
      padding: '16px 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 700, color: '#0f1419', textDecoration: 'none' }}>
          ProFaceApp
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/ai-headshots" style={{ color: '#57606e', textDecoration: 'none', fontWeight: 500 }}>
            AI Headshots
          </Link>
          <Link href="#pricing" style={{ color: '#57606e', textDecoration: 'none', fontWeight: 500 }}>
            Pricing
          </Link>
          <Link href="/?auth=login" style={{ color: '#0f1419', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
