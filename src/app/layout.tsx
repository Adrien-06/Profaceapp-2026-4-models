import type { Metadata } from 'next';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';

export const metadata: Metadata = {
  title: 'AI Headshot Generator: Studio Photos in 90 Seconds | ProFaceApp',
  description: 'Generate pro AI headshots in 90 seconds. 4 AI models, free trial. No photographer needed—perfect for LinkedIn, resumes & corporate sites.',
  keywords: ['ai headshot generator', 'professional ai headshots', 'linkedin headshot', 'ai photo generator'],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
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
  alternates: {
    canonical: 'https://profaceapp.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
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
