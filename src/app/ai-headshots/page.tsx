import type { Metadata } from 'next';
import AIHeadshotsClient from './AIHeadshotsClient';

export const metadata: Metadata = {
  title: 'AI Headshot Generator — Studio Photos in 90 Seconds | ProFaceApp',
  description: 'Generate professional AI headshots in 90 seconds. 4 AI models for Real Estate, Legal, Finance & Startups. No photographer needed. Free trial — LinkedIn-ready.',
  keywords: ['ai headshot generator', 'professional ai headshots', 'ai headshots', 'linkedin headshot generator', 'ai photo generator', 'professional headshot ai', 'ai portrait generator'],
  openGraph: {
    title: 'AI Headshot Generator — Studio Photos in 90 Seconds | ProFaceApp',
    description: 'Generate stunning professional AI headshots with 4 AI models in 90 seconds. Used by 14,200+ professionals.',
    url: 'https://profaceapp.com/ai-headshots',
    type: 'website',
    siteName: 'ProFaceApp',
    images: [
      {
        url: 'https://profaceapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProFaceApp AI Headshot Generator — Studio Photos in 90 Seconds',
      },
    ],
  },
  alternates: {
    canonical: 'https://profaceapp.com/ai-headshots',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function AIHeadshotsPage() {
  return (
    <>
      <AIHeadshotsClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProFaceApp AI Headshot Generator',
            description: 'Generate professional AI headshots in 90 seconds with 4 AI models: Realtor, Executive, Analyst, Innovator.',
            url: 'https://profaceapp.com/ai-headshots',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: [
              { '@type': 'Offer', name: 'One-shot', price: '29', priceCurrency: 'USD', description: '40 photos, one-time payment' },
              { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD', description: '100 photos/month, billed yearly' },
              { '@type': 'Offer', name: 'Max', price: '79', priceCurrency: 'USD', description: '250 photos/month, billed yearly' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '14200',
              bestRating: '5',
            },
            author: { '@type': 'Organization', name: 'ProFaceApp', url: 'https://profaceapp.com' },
            featureList: [
              '4 professional AI models',
              'Studio-quality headshots in 90 seconds',
              'LinkedIn-ready portraits',
              'Real Estate, Legal, Finance, Startup styles',
              'Private & secure storage',
              'HD downloads',
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is an AI headshot generator?', acceptedAnswer: { '@type': 'Answer', text: 'An AI headshot generator uses artificial intelligence to transform your selfies into professional studio-quality portraits in seconds. ProFaceApp offers 4 distinct models—Realtor, Executive, Analyst, Innovator—each tuned for a specific industry and look.' } },
              { '@type': 'Question', name: 'How long does it take to generate AI headshots?', acceptedAnswer: { '@type': 'Answer', text: 'ProFaceApp delivers your finished headshots in 90 seconds or less. Upload 1–5 selfies, select your AI model, and your studio-grade portrait appears in your dashboard almost instantly.' } },
              { '@type': 'Question', name: 'Can I use AI headshots on LinkedIn?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. AI-generated headshots are widely accepted on LinkedIn and other professional platforms. Our portraits are indistinguishable from high-end studio photos.' } },
              { '@type': 'Question', name: 'How much does it cost compared to a real photographer?', acceptedAnswer: { '@type': 'Answer', text: 'A professional headshot session typically costs $200–$600. ProFaceApp starts at $29 one-time—and subscription plans give you unlimited regenerations.' } },
              { '@type': 'Question', name: 'Are my selfies and headshots private?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All uploads are encrypted in transit and at rest. We never share your photos with third parties and never use them to train AI models.' } },
              { '@type': 'Question', name: 'What are the 4 AI models?', acceptedAnswer: { '@type': 'Answer', text: 'The Realtor (warm, real estate), The Executive (commanding, law/consulting), The Analyst (precise, finance), The Innovator (modern, startups). Each is purpose-built for its industry.' } },
              { '@type': 'Question', name: 'What selfies work best?', acceptedAnswer: { '@type': 'Answer', text: 'Upload 1–5 well-lit photos in good natural or indoor light, from slightly different angles. Front-facing, neutral background selfies give the strongest results.' } },
              { '@type': 'Question', name: 'Can I regenerate if I don\'t like the result?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Pro and Max plans include unlimited regenerations. Try a different selfie, swap AI models, and get a new set in 90 seconds.' } },
            ],
          }),
        }}
      />
    </>
  );
}
