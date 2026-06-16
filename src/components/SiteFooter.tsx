'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer style={{
      background: '#0f1419',
      color: '#fff',
      padding: '60px 28px 40px',
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Product</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <Link href="/ai-headshots" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  AI Headshots
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link href="/ai-headshots#pricing" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/ai-headshots#models" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  AI Models
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <Link href="/" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link href="/blog" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Blog
                </Link>
              </li>
              <li>
                <a href="mailto:hello@profaceapp.com" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Legal</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <Link href="/privacy" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Privacy
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link href="/terms" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" style={{ color: '#ccc', textDecoration: 'none', fontSize: 14 }}>
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#999' }}>
            © {new Date().getFullYear()} ProFaceApp. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="https://twitter.com" style={{ color: '#ccc', textDecoration: 'none', fontSize: 12 }}>
              Twitter
            </a>
            <a href="https://linkedin.com" style={{ color: '#ccc', textDecoration: 'none', fontSize: 12 }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
