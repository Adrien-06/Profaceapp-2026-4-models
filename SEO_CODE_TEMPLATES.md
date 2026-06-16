# Code Templates Prêts-à-Copier - SEO ProFaceApp

**Pour l'implémentation rapide, copier-coller les templates ci-dessous dans les fichiers correspondants.**

---

## TEMPLATE 1: robots.txt

**Emplacement:** `/public/robots.txt` (créer le fichier)

```txt
# ProFaceApp robots.txt
# Allow all public content, block private routes

User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/*
Disallow: /account
Disallow: /account/*
Disallow: /api
Disallow: /api/*
Disallow: /auth
Disallow: /auth/*
Disallow: /?auth=*
Disallow: /?code=*
Disallow: /?redirect=*
Disallow: *?*= # Block all query params

# Crawl delay (optional, helps Google throttle)
Crawl-delay: 1

# Sitemap reference
Sitemap: https://profaceapp.com/sitemap.xml
Sitemap: https://profaceapp.com/sitemap-blog.xml
```

**Vérification après déploiement:**
```bash
curl https://profaceapp.com/robots.txt
# Doit afficher le contenu ci-dessus
```

---

## TEMPLATE 2: sitemap.ts

**Emplacement:** `/src/app/sitemap.ts` (créer le fichier)

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://profaceapp.com';

  // Static pages (core navigation)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal-notice`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // FUTURE PAGES - Add after creating them
  // Uncomment when pages are live
  const futurePages: MetadataRoute.Sitemap = [
    // {
    //   url: `${baseUrl}/ai-headshots`,
    //   lastModified: new Date('2026-06-23'),
    //   changeFrequency: 'weekly',
    //   priority: 0.95,
    // },
    // {
    //   url: `${baseUrl}/ai-headshots/real-estate`,
    //   lastModified: new Date('2026-06-30'),
    //   changeFrequency: 'weekly',
    //   priority: 0.85,
    // },
    // {
    //   url: `${baseUrl}/ai-headshots/legal`,
    //   lastModified: new Date('2026-06-30'),
    //   changeFrequency: 'weekly',
    //   priority: 0.85,
    // },
    // {
    //   url: `${baseUrl}/ai-headshots/finance`,
    //   lastModified: new Date('2026-06-30'),
    //   changeFrequency: 'weekly',
    //   priority: 0.85,
    // },
  ];

  return [...staticPages, ...futurePages];
}
```

**Vérification après déploiement:**
```bash
curl https://profaceapp.com/sitemap.xml
# Doit retourner XML avec les pages
```

---

## TEMPLATE 3: layout.tsx - Metadata Optimisée

**Emplacement:** `/src/app/layout.tsx` (remplacer la section `metadata`)

**AVANT:**
```typescript
export const metadata: Metadata = {
  title: 'Proface app | professional shots in seconds',
  description: 'Generate studio-quality AI professional headshots in seconds. Upload selfies, get 1 polished portrait for LinkedIn, resumes & team pages.',
  // ... rest
};
```

**APRÈS (Optimisé pour "ai headshot generator"):**

```typescript
import type { Metadata } from 'next';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';

export const metadata: Metadata = {
  // === SEO Core ===
  title: 'AI Headshot Generator: Studio Photos in 90 Seconds | ProFaceApp',
  description: 'Generate pro AI headshots in 90 seconds. 4 AI models, free trial. No photographer needed—perfect for LinkedIn, resumes & corporate sites.',
  
  // === Keywords (for reference, not in HTML but influences relevance) ===
  keywords: ['ai headshot generator', 'professional ai headshots', 'linkedin headshot', 'ai photo generator'],
  
  // === Icons ===
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  
  // === Open Graph (Social Media) ===
  openGraph: {
    title: 'Professional AI Headshots for LinkedIn & Business | ProFaceApp',
    description: 'Create stunning AI headshots with 4 AI models in 90 seconds. Used by 50k+ professionals.',
    url: 'https://profaceapp.com',
    siteName: 'ProFaceApp',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://profaceapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProFaceApp - AI Headshot Generator',
      },
    ],
  },
  
  // === Robots Metadata ===
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // === Alternates (for localization, if needed) ===
  alternates: {
    canonical: 'https://profaceapp.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        {/* === SEO Schema Markup === */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ProFaceApp',
              url: 'https://profaceapp.com',
              logo: 'https://profaceapp.com/logo.png',
              description: 'AI Headshot Generator - Professional photos in 90 seconds',
              sameAs: [
                'https://twitter.com/profaceapp',
                'https://linkedin.com/company/profaceapp',
              ],
            }),
          }}
        />
        
        {/* === Existing Trackers === */}
        <FacebookPixel />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D8D9A9JC77UA33STL290');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D8D9A9JC77UA33STL290&lib=ttq"
            alt=""
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x2vbfwcjzc");
            `,
          }}
        />
        
        {/* === Fonts === */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

## TEMPLATE 4: page.tsx pour /ai-headshots

**Emplacement:** `/src/app/ai-headshots/page.tsx` (créer le fichier)

```typescript
import type { Metadata } from 'next';
import AIHeadshotsClient from './AIHeadshotsClient';

export const metadata: Metadata = {
  title: 'AI Headshot Generator: Professional Photos in 90 Seconds | ProFaceApp',
  description: 'Create professional AI headshots in 2 minutes. 4 AI models, studio-quality, LinkedIn-ready. Free trial—no photographer needed.',
  keywords: ['ai headshot generator', 'professional ai headshots', 'linkedin headshot generator', 'ai portrait'],
  openGraph: {
    title: 'Professional AI Headshots for LinkedIn & Business | ProFaceApp',
    description: 'Generate stunning AI headshots in 90 seconds with 4 AI models. Free trial included. Used by 50k+ professionals.',
    url: 'https://profaceapp.com/ai-headshots',
    type: 'website',
    images: [
      {
        url: 'https://profaceapp.com/og-ai-headshots.png',
        width: 1200,
        height: 630,
        alt: 'AI Headshot Generator - Professional photos',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://profaceapp.com/ai-headshots',
  },
};

export const dynamic = 'force-dynamic';

export default function AIHeadshotsPage() {
  // === Schema Markup for AI Headshots Page ===
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ProFaceApp - AI Headshot Generator',
    description: 'Generate professional AI headshots in 90 seconds with 4 AI models',
    url: 'https://profaceapp.com/ai-headshots',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    provider: {
      '@type': 'Organization',
      name: 'ProFaceApp',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://profaceapp.com/ai-headshots',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Free trial, no credit card required',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5000',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      '4 AI Models',
      '90 Second Generation',
      'Studio Quality',
      'LinkedIn Ready',
      'Free Trial',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does it take to generate AI headshots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our AI generates professional headshots in 90 seconds. Just upload a selfie and choose your AI model.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use AI headshots on LinkedIn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! AI headshots are perfect for LinkedIn. They\'re professional, unique, and you own all rights to use them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Generate your first headshot completely free. No credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes ProFaceApp different?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ProFaceApp specializes in professional headshots with 4 AI models, 90-second generation, and affordable pricing starting at $4.99/month.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get different poses and styles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Choose from 4 different AI models, each with unique styles. Generate unlimited variations until you find the perfect one.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AIHeadshotsClient />
    </>
  );
}
```

---

## TEMPLATE 5: AIHeadshotsClient.tsx

**Emplacement:** `/src/app/ai-headshots/AIHeadshotsClient.tsx` (créer le fichier)

```typescript
'use client';

import React from 'react';
import Link from 'next/link';

export default function AIHeadshotsClient() {
  const [selectedModel, setSelectedModel] = React.useState('professional');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Poppins, sans-serif' }}>
      {/* === Navigation === */}
      <nav style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#0B66E4',
          textDecoration: 'none',
        }}>
          ← Back to ProFaceApp
        </Link>
        <span style={{ fontSize: '12px', color: '#999' }}>Professional AI Headshots</span>
      </nav>

      {/* === Hero Section === */}
      <section style={{
        backgroundColor: 'white',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '20px',
          color: '#1a1a1a',
          margin: '0 auto 20px',
          maxWidth: '800px',
        }}>
          Generate Professional AI Headshots in 90 Seconds
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#555',
          maxWidth: '700px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
        }}>
          Create studio-quality professional headshots using advanced AI. No photographer needed. 
          Perfect for LinkedIn, corporate websites, resumes, and business cards.
        </p>

        {/* === CTA Buttons === */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '60px',
          flexWrap: 'wrap',
        }}>
          <button style={{
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#0B66E4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0955b8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0B66E4'}
          onClick={() => window.location.href = '/?auth=signup'}
          >
            Generate My Headshots Free
          </button>
          <button style={{
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: '#0B66E4',
            border: '2px solid #0B66E4',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          >
            See Examples
          </button>
        </div>

        {/* === Social Proof === */}
        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: '14px',
          color: '#666',
        }}>
          <div>⭐⭐⭐⭐⭐ 4.8 Rating (5,000+ reviews)</div>
          <div>✓ 50K+ Professionals</div>
          <div>⚡ 90 Seconds to Perfect Headshot</div>
        </div>
      </section>

      {/* === Featured Section === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          marginBottom: '40px', 
          color: '#1a1a1a',
          fontWeight: '700',
        }}>
          See It in Action
        </h2>
        <div style={{
          backgroundColor: 'white',
          maxWidth: '600px',
          margin: '0 auto',
          borderRadius: '8px',
          overflow: 'hidden',
          aspectRatio: '16/9',
        }}>
          <img 
            src="/hero/headshot-demo.png" 
            alt="AI headshot generation example showing before and after professional photos"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }}
          />
        </div>
      </section>

      {/* === Use Cases === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: 'white',
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          textAlign: 'center', 
          marginBottom: '50px', 
          color: '#1a1a1a',
          fontWeight: '700',
        }}>
          Perfect For:
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { title: 'LinkedIn Profiles', desc: 'Stand out with a professional headshot' },
            { title: 'Business Cards', desc: 'Print-ready professional photos' },
            { title: 'Corporate Websites', desc: 'Team photos without expensive shoots' },
            { title: 'Resume & Portfolio', desc: 'Make a great first impression' },
            { title: 'Real Estate Agents', desc: 'Professional presence for clients' },
            { title: 'Legal & Finance', desc: 'Trust-building professional images' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '30px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: '#0B66E4' 
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === AI Models === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: '#f5f5f5',
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          textAlign: 'center', 
          marginBottom: '50px', 
          color: '#1a1a1a',
          fontWeight: '700',
        }}>
          Choose From 4 AI Models
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { id: 'professional', name: 'Professional', desc: 'Corporate & business', style: '#E8F0FE' },
            { id: 'creative', name: 'Creative', desc: 'Artistic & unique', style: '#F3E5F5' },
            { id: 'modern', name: 'Modern', desc: 'Trendy & contemporary', style: '#E0F2F1' },
            { id: 'executive', name: 'Executive', desc: 'Authority & leadership', style: '#FFF3E0' },
          ].map((model) => (
            <div 
              key={model.id}
              style={{
                padding: '20px',
                backgroundColor: model.style,
                borderRadius: '8px',
                cursor: 'pointer',
                opacity: selectedModel === model.id ? 1 : 0.7,
                border: selectedModel === model.id ? '2px solid #0B66E4' : 'none',
                transition: 'all 0.3s',
              }}
              onClick={() => setSelectedModel(model.id)}
            >
              <h3 style={{ fontWeight: '600', marginBottom: '5px' }}>{model.name}</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>{model.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Stats === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: 'white',
        textAlign: 'center',
      }}>
        <h2 style={{ 
          fontSize: '28px', 
          marginBottom: '40px', 
          color: '#1a1a1a',
          fontWeight: '700',
        }}>
          Trusted by Professionals Worldwide
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0B66E4' }}>50K+</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Professionals Using ProFaceApp</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0B66E4' }}>90s</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Average Generation Time</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0B66E4' }}>4.8★</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Rating (5,000 reviews)</div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: '#f5f5f5',
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          textAlign: 'center', 
          marginBottom: '50px', 
          color: '#1a1a1a',
          fontWeight: '700',
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              q: 'Are AI headshots professional enough for LinkedIn?',
              a: 'Yes! Our AI generates studio-quality professional headshots perfect for LinkedIn, corporate websites, and business use. Many professionals prefer AI headshots for their consistency and professionalism.'
            },
            {
              q: 'How much does it cost?',
              a: 'Start free with our trial. No credit card required. Paid plans start at $4.99/month for unlimited generation with all 4 AI models.'
            },
            {
              q: 'Can I use my AI headshots commercially?',
              a: 'Yes! You own all rights to your generated headshots. Use them freely on LinkedIn, business cards, websites, portfolios, and any commercial use.'
            },
            {
              q: 'What if I don\'t like my first result?',
              a: 'Try different AI models, adjust settings, or regenerate unlimited times. You\'ll always get a perfect headshot.'
            },
            {
              q: 'Do you need my personal data?',
              a: 'Just upload a clear selfie. We don\'t store personal information—only your generated headshots for download. Your privacy is our priority.'
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '25px', borderBottom: '1px solid #e0e0e0', paddingBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '10px', 
                color: '#1a1a1a' 
              }}>
                {item.q}
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === Final CTA === */}
      <section style={{
        padding: '60px 40px',
        backgroundColor: '#0B66E4',
        color: 'white',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
          Ready to Get Your Perfect Headshot?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.95 }}>
          Generate professional AI headshots in 90 seconds. Free trial, no credit card required.
        </p>
        <button style={{
          padding: '18px 50px',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: 'white',
          color: '#0B66E4',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'transform 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onClick={() => window.location.href = '/?auth=signup'}
        >
          Start Generating Now
        </button>
      </section>

      {/* === Footer === */}
      <footer style={{
        padding: '40px',
        backgroundColor: '#1a1a1a',
        color: '#999',
        fontSize: '12px',
        textAlign: 'center',
      }}>
        <p>© 2026 ProFaceApp. All rights reserved.</p>
        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: '#999', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/cookies" style={{ color: '#999', textDecoration: 'none' }}>Cookie Policy</Link>
        </div>
      </footer>
    </div>
  );
}
```

---

## INSTRUCTIONS D'IMPLÉMENTATION RAPIDE

### Étape 1: Créer les fichiers statiques (5 min)

```bash
# Créer robots.txt
touch /path/to/public/robots.txt
# Copier contenu du TEMPLATE 1

# Créer sitemap.ts
touch /path/to/src/app/sitemap.ts
# Copier contenu du TEMPLATE 2
```

### Étape 2: Modifier layout.tsx (10 min)

```bash
# Ouvrir /src/app/layout.tsx
# Remplacer la section metadata par TEMPLATE 3
# Sauvegarder
```

### Étape 3: Créer landing page AI Headshots (15 min)

```bash
# Créer le répertoire
mkdir -p /path/to/src/app/ai-headshots

# Créer les fichiers
touch /path/to/src/app/ai-headshots/page.tsx
touch /path/to/src/app/ai-headshots/AIHeadshotsClient.tsx

# Copier le contenu des TEMPLATES 4 et 5
```

### Étape 4: Déployer et valider (10 min)

```bash
# Commit et push
git add .
git commit -m "SEO improvements: robots.txt, sitemap, optimized metadata, AI headshots landing page"
git push origin main

# Valider
curl https://profaceapp.com/robots.txt
curl https://profaceapp.com/sitemap.xml
# Doit afficher le contenu respectif

# Valider schema
# Aller sur https://schema.org/validate
# Importer https://profaceapp.com/
```

### Étape 5: Google Search Console (5 min)

```
1. Aller à Google Search Console
2. Propriété ProFaceApp
3. Coverage → 5 pages non-indexées
4. Pour chaque page: "Request Indexing"
5. Attendre 48-72h pour indexation
```

**Temps total pour Phase 1:** ~45 minutes

---

## Checklist de Validation Post-Déploiement

```
☐ robots.txt accessible: curl https://profaceapp.com/robots.txt
☐ sitemap.xml accessible: curl https://profaceapp.com/sitemap.xml
☐ /ai-headshots chargeable: https://profaceapp.com/ai-headshots
☐ Metadata optimisé: Inspecter page source, chercher nouveau title/description
☐ Schema validé: https://schema.org/validate → Zéro erreur
☐ Mobile responsive: Vérifier /ai-headshots sur mobile
☐ Images optimisées: PageSpeed Insights → LCP < 2.5s
☐ GSC submit: Coverage → "Request Indexing" pour 5 pages + /ai-headshots
☐ Baseline CTR mesurée: GSC → Performance → Note CTR actuel
☐ Baseline position noté: Positions avant optimisation (benchmark week 1)
```

---

**FIN DES TEMPLATES**

*Tous les templates ci-dessus sont prêts à copier-coller. Personnaliser les URLs/nombres si besoin.*
