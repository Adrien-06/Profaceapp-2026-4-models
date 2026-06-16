import type { Metadata } from 'next';
import AIHeadshotsClient from './AIHeadshotsClient';

export const metadata: Metadata = {
  title: 'AI Headshot Generator: Professional Photos in 90 Seconds | ProFaceApp',
  description: 'Create professional AI headshots in 2 minutes. 4 AI models, studio-quality, LinkedIn-ready. Free trial—no photographer needed.',
  keywords: ['ai headshot generator', 'professional ai headshots', 'linkedin headshot generator', 'ai portrait', 'ai photo'],
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
        alt: 'AI Headshot Generator - Professional photos in 90 seconds',
      },
    ],
  },
  alternates: {
    canonical: 'https://profaceapp.com/ai-headshots',
  },
};

export default function AIHeadshotsPage() {
  return (
    <>
      <AIHeadshotsClient />

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProFaceApp AI Headshot Generator',
            description: 'Generate professional AI headshots in 90 seconds with 4 AI models',
            url: 'https://profaceapp.com/ai-headshots',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free trial available',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '14200',
            },
            author: {
              '@type': 'Organization',
              name: 'ProFaceApp',
            },
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
              {
                '@type': 'Question',
                name: 'What is an AI headshot generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An AI headshot generator uses artificial intelligence to create professional-quality headshots from selfies in seconds, without needing a photographer or studio.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does it take to generate AI headshots?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ProFaceApp generates professional AI headshots in just 90 seconds. Simply upload your selfie and choose your preferred AI model.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a free trial?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! ProFaceApp offers a free trial so you can test the service and see the quality of AI-generated headshots before committing.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use AI headshots for LinkedIn?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! ProFaceApp AI headshots are optimized for LinkedIn and other professional platforms. They look professional and trustworthy.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the 4 AI models?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ProFaceApp offers 4 professional AI models: The Realtor (warm, approachable), The Executive (commanding, boardroom-ready), The Analyst (clean, precise), and The Innovator (modern, dynamic).',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
