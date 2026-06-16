'use client';

import { useRouter } from 'next/navigation';

export default function AIHeadshotsClient() {
  const router = useRouter();

  return (
    <div className="ai-headshots-page">
      {/* Hero Section */}
      <section className="hero-ai-headshots">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="dot" />
            Professional AI Headshots · 90 Seconds
          </span>
          <h1>Studio-Quality Headshots in 90 Seconds</h1>
          <p className="lede">
            No photographer. No studio. No waiting weeks. Just upload a selfie, choose your professional style,
            and get polished AI headshots ready for LinkedIn, resumes, and team pages.
          </p>

          <div className="cta-group">
            <button className="cta primary" onClick={() => router.push('/?auth=signup')}>
              <span>Try Free Trial</span>
              <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                <path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z" />
              </svg>
            </button>
            <a href="/?auth=login" className="btn-secondary">View pricing</a>
          </div>

          <div className="trust-row">
            <div className="avatars" aria-hidden="true">
              <span className="av av1" /><span className="av av2" /><span className="av av3" /><span className="av av4" />
            </div>
            <div className="trust-copy">
              <div className="stars">★★★★★</div>
              <span><strong>14,200+</strong> professionals · rated 4.9/5</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mosaic-grid">
            {[
              { img: '/hero/real-estate-1.webp', label: 'The Realtor' },
              { img: '/hero/firm-2.webp', label: 'The Executive' },
              { img: '/hero/account-3.webp', label: 'The Analyst' },
              { img: '/hero/startup-5.webp', label: 'The Innovator' },
            ].map((item, i) => (
              <div key={i} className="mosaic-cell">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.label} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="mosaic-label">
                  <div>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI Headshots */}
      <section className="why-ai-headshots">
        <div className="section-head">
          <h2>Why Choose AI Headshots?</h2>
          <p>Better than a professional photographer—faster, cheaper, and always perfect.</p>
        </div>

        <div className="benefits-grid">
          {[
            {
              icon: '⚡',
              title: '90 Seconds',
              desc: 'From selfie to polished headshot. No waiting for appointments or editing.',
            },
            {
              icon: '💰',
              title: 'Affordable',
              desc: '$4.99/month for unlimited headshots. Studio shoots cost $200-500+.',
            },
            {
              icon: '🎨',
              title: '4 Professional Styles',
              desc: 'Choose the look that matches your industry—Realtor, Executive, Analyst, or Innovator.',
            },
            {
              icon: '🔄',
              title: 'Always Available',
              desc: 'Need a new headshot? Regenerate instantly. No need to reschedule.',
            },
            {
              icon: '✨',
              title: 'Studio Quality',
              desc: 'Professional lighting, composition, and color grading. Every time.',
            },
            {
              icon: '🔒',
              title: 'Private & Secure',
              desc: 'Your photos are encrypted. Never used to train AI. Only you can access.',
            },
          ].map((item, i) => (
            <div key={i} className="benefit-card">
              <div className="benefit-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 AI Models */}
      <section className="models-showcase">
        <div className="section-head">
          <h2>4 Professional AI Models</h2>
          <p>Each designed for a specific professional context.</p>
        </div>

        <div className="models-grid">
          {[
            {
              name: 'The Realtor',
              industry: 'Real Estate',
              desc: 'Warm, approachable, trustworthy. Build instant confidence with clients.',
              color: '#475569',
              img: '/hero/real-estate-4.webp',
            },
            {
              name: 'The Executive',
              industry: 'Legal & Consulting',
              desc: 'Dark, commanding boardroom presence. Perfect for law firms and C-suite.',
              color: '#0F1419',
              img: '/hero/firm-4.webp',
            },
            {
              name: 'The Analyst',
              industry: 'Finance & Accounting',
              desc: 'Clean, neutral precision. Wins fiduciary confidence on first sight.',
              color: '#0A66C2',
              img: '/hero/account-4.webp',
            },
            {
              name: 'The Innovator',
              industry: 'Startups & Tech',
              desc: 'Modern, dynamic, forward-looking. Says you\'re building the future.',
              color: '#741B7C',
              img: '/hero/startup-4.webp',
            },
          ].map((model, i) => (
            <div key={i} className="model-showcase-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={model.img} alt={model.name} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
              <div className="model-info">
                <h3>{model.name}</h3>
                <p className="model-industry">{model.industry}</p>
                <p className="model-desc">{model.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-head">
          <h2>How It Works in 3 Steps</h2>
        </div>

        <div className="steps-grid">
          {[
            {
              num: '1',
              title: 'Upload Selfies',
              desc: '1-5 well-lit photos from different angles. Phone selfies work perfectly.',
            },
            {
              num: '2',
              title: 'Choose Your Style',
              desc: 'Pick from 4 professional AI models. See previews instantly.',
            },
            {
              num: '3',
              title: 'Download & Share',
              desc: 'Your studio-quality headshot in 90 seconds. Save to My Folders.',
            },
          ].map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases / Social Proof */}
      <section className="use-cases">
        <div className="section-head">
          <h2>Who Uses AI Headshots?</h2>
        </div>

        <div className="use-cases-grid">
          {[
            {
              icon: '🏠',
              title: 'Real Estate Agents',
              desc: 'Portfolio of 24 agents outfitted in one afternoon. Save $6,000+ vs. photographer.',
            },
            {
              icon: '⚖️',
              title: 'Law Firms',
              desc: 'Partner pages with court-ready portraits. 2 minutes instead of half-day studio.',
            },
            {
              icon: '💼',
              title: 'Consultants',
              desc: 'Pitch deck-ready photos. Boardroom authority in 90 seconds.',
            },
            {
              icon: '📊',
              title: 'Financial Advisors',
              desc: 'FINRA-friendly, regulatory-grade shots. Regenerate any advisor instantly.',
            },
            {
              icon: '🚀',
              title: 'Startup Founders',
              desc: 'LinkedIn-ready headshots that say "we\'re building the future."',
            },
            {
              icon: '👔',
              title: 'Corporate Teams',
              desc: 'Consistent team pages. Bulk credits at team pricing.',
            },
          ].map((use, i) => (
            <div key={i} className="use-case-card">
              <div className="use-case-icon">{use.icon}</div>
              <h3>{use.title}</h3>
              <p>{use.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-head">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-grid">
          {[
            {
              q: 'Is this AI-generated?',
              a: 'Yes—we use advanced AI to generate headshots from your real selfies. The AI analyzes your features and creates a polished, professional version.',
            },
            {
              q: 'Can I use these on LinkedIn?',
              a: 'Absolutely. LinkedIn allows AI-generated headshots. Many professionals use ProFaceApp for their LinkedIn profile picture.',
            },
            {
              q: 'What if I don\'t like the results?',
              a: 'You can regenerate instantly with different prompts or re-upload different selfies. No limits on free trial.',
            },
            {
              q: 'How much does it cost?',
              a: 'From $4.99/month (Pro plan) for unlimited headshots. One-time payment option also available.',
            },
            {
              q: 'Are my photos private?',
              a: 'Yes. All photos are encrypted and stored privately. We never share or use them to train AI models.',
            },
            {
              q: 'Can I use these for commercial purposes?',
              a: 'Yes. All headshots generated are yours to use commercially—LinkedIn, websites, marketing, team pages, etc.',
            },
          ].map((item, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{item.q}</summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-ai">
        <div className="cta-content">
          <h2>Get Your Professional AI Headshot Today</h2>
          <p>Join 14,200+ professionals who use ProFaceApp.</p>
          <button className="cta large" onClick={() => router.push('/?auth=signup')}>
            <span>Start Free Trial</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path d="M3 10h12.2l-4.6-4.6 1.4-1.4L19 10l-7 7-1.4-1.4 4.6-4.6H3z" />
            </svg>
          </button>
        </div>
      </section>

      <style jsx>{`
        .ai-headshots-page {
          width: 100%;
        }

        .hero-ai-headshots {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 120px 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .hero-content h1 {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          margin: 24px 0;
          color: #0f1419;
        }

        .hero-content .lede {
          font-size: 18px;
          line-height: 1.6;
          color: #666;
          margin: 24px 0 40px;
        }

        .cta-group {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .cta.primary {
          background: #0B66E4;
          color: white;
        }

        .cta.primary:hover {
          background: #0952c4;
          transform: translateY(-2px);
        }

        .btn-secondary {
          padding: 14px 32px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #0f1419;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          border-color: #0B66E4;
          color: #0B66E4;
        }

        .trust-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatars {
          display: flex;
          margin-left: -8px;
        }

        .av {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 3px solid white;
          margin-left: -8px;
        }

        .trust-copy .stars {
          color: #fbbf24;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .trust-copy span {
          color: #666;
          font-size: 14px;
        }

        .hero-visual {
          position: relative;
        }

        .mosaic-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .mosaic-cell {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .mosaic-cell:hover {
          transform: scale(1.05);
        }

        .mosaic-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mosaic-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          padding: 20px 16px;
          font-weight: 600;
          font-size: 14px;
        }

        /* Benefits Section */
        .why-ai-headshots {
          padding: 100px 40px;
          background: #f9fafb;
        }

        .section-head {
          text-align: center;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-head h2 {
          font-size: 44px;
          font-weight: 800;
          margin-bottom: 16px;
          color: #0f1419;
        }

        .section-head p {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .benefit-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s;
          border: 1px solid #e2e8f0;
        }

        .benefit-card:hover {
          border-color: #0B66E4;
          box-shadow: 0 10px 30px rgba(11, 102, 228, 0.1);
          transform: translateY(-4px);
        }

        .benefit-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .benefit-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0f1419;
        }

        .benefit-card p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }

        /* Models Showcase */
        .models-showcase {
          padding: 100px 40px;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .model-showcase-card {
          border-radius: 12px;
          overflow: hidden;
          background: white;
          border: 1px solid #e2e8f0;
          transition: all 0.3s;
        }

        .model-showcase-card:hover {
          border-color: #0B66E4;
          box-shadow: 0 10px 30px rgba(11, 102, 228, 0.1);
          transform: translateY(-4px);
        }

        .model-showcase-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
        }

        .model-info {
          padding: 24px;
        }

        .model-info h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #0f1419;
        }

        .model-industry {
          font-size: 13px;
          color: #0B66E4;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .model-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        /* How It Works */
        .how-it-works {
          padding: 100px 40px;
          background: #f9fafb;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .step-card {
          text-align: center;
        }

        .step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: #0B66E4;
          color: white;
          font-size: 28px;
          font-weight: 800;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .step-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0f1419;
        }

        .step-card p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        /* Use Cases */
        .use-cases {
          padding: 100px 40px;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .use-case-card {
          padding: 32px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .use-case-card:hover {
          border-color: #0B66E4;
          background: #f0f7ff;
        }

        .use-case-icon {
          font-size: 36px;
          margin-bottom: 16px;
        }

        .use-case-card h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0f1419;
        }

        .use-case-card p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        /* FAQ */
        .faq-section {
          padding: 100px 40px;
          background: #f9fafb;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .faq-question {
          padding: 16px 20px;
          cursor: pointer;
          font-weight: 600;
          color: #0f1419;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }

        .faq-question:hover {
          background: #f0f7ff;
        }

        .faq-answer {
          padding: 16px 20px;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          border-top: 1px solid #e2e8f0;
        }

        /* Final CTA */
        .final-cta-ai {
          padding: 100px 40px;
          background: linear-gradient(135deg, #0B66E4 0%, #0952c4 100%);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 44px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 18px;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta.large {
          background: white;
          color: #0B66E4;
          padding: 16px 40px;
          font-size: 16px;
          margin: 0 auto;
        }

        .cta.large:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-ai-headshots {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 20px;
          }

          .hero-content h1 {
            font-size: 36px;
          }

          .cta-group {
            flex-direction: column;
          }

          .section-head h2 {
            font-size: 32px;
          }

          .benefits-grid,
          .models-grid,
          .use-cases-grid {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
