import type { Metadata } from 'next';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import TikTokPixel from '@/components/TikTokPixel';

export const metadata: Metadata = {
  title: 'Proface app | professional shots in seconds',
  description: 'Generate studio-quality AI professional headshots in seconds. Upload selfies, get 1 polished portrait for LinkedIn, resumes & team pages.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ProFaceApp — AI Professional Headshots',
    description: 'Studio-quality AI headshots in 90 seconds.',
    url: 'https://profaceapp.com',
    siteName: 'ProFaceApp',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <FacebookPixel />
        <TikTokPixel />
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
