import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy — ProFaceApp',
  description: 'Cookie Policy for ProFaceApp by UUTSY LLC',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '28px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#111111',
  marginBottom: '12px',
  marginTop: 0,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#222222',
  marginBottom: '8px',
  marginTop: '16px',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#444444',
  margin: '0 0 12px 0',
};

const linkStyle: React.CSSProperties = {
  color: '#0B66E4',
  wordBreak: 'break-all',
};

export default function CookiesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        background: '#ffffff',
        padding: '48px',
        borderRadius: '8px',
        border: '1px solid #ebedf0',
      }}>
        <Link href="/" style={{ color: '#0B66E4', textDecoration: 'none', fontSize: '14px' }}>
          &larr; Back to ProFaceApp
        </Link>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111111', margin: '24px 0 8px 0' }}>
          Cookie Policy
        </h1>
        <p style={{ fontSize: '14px', color: '#888888', marginBottom: '32px' }}>
          Last Updated: May 28, 2026
        </p>

        <p style={{ ...paragraphStyle, marginBottom: '32px' }}>
          UUTSY LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website https://profaceapp.com (the &quot;Service&quot;). This Cookie Policy explains what cookies are, how we use cookies on our platform, how third parties we partner with may use cookies, and your choices regarding cookie management.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. What Are Cookies?</h2>
          <p style={paragraphStyle}>
            Cookies are small text files sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third party to recognize you, make your next visit easier, and make the Service more useful to you. Cookies can be &quot;persistent&quot; (stored on your device until they expire or are deleted) or &quot;session&quot; (deleted automatically as soon as you close your web browser).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. How Proface App Uses Cookies</h2>
          <p style={paragraphStyle}>
            When you access and use the Service, we may place a number of cookies files in your web browser. We use cookies for the following operational reasons:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>To enable certain core functions of the Service (e.g., maintaining your active login session).</li>
            <li>To store your user preferences and settings.</li>
            <li>To prevent fraudulent activity and improve account security.</li>
            <li>To process secure payments and verify checkout sessions.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Categories of Cookies We Use</h2>

          <h3 style={subHeadingStyle}>3.1. Essential (Strictly Necessary) Cookies:</h3>
          <p style={paragraphStyle}>
            These cookies are mandatory for the website to function properly. Without them, you would not be able to log in to your account, secure your profile, or purchase AI generation credits.
          </p>
          <p style={paragraphStyle}>
            Purpose: Authentication, user session security, and infrastructure stability (via Vercel).
          </p>

          <h3 style={subHeadingStyle}>3.2. Functionality Cookies:</h3>
          <p style={paragraphStyle}>
            These cookies allow our platform to remember choices you make when you use the website and to provide enhanced, personalized features.
          </p>
          <p style={paragraphStyle}>
            Purpose: Remembering your UI preferences or language settings.
          </p>

          <h3 style={subHeadingStyle}>3.3. Third-Party and Analytical Cookies:</h3>
          <p style={paragraphStyle}>
            In addition to our own cookies, we use trusted third-party services to report usage statistics of the Service and handle billing transactions:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Stripe: Stripe places cookies to manage secure payment flows, prevent credit card fraud, and calculate regional sales taxes accurately.</li>
            <li>Google Analytics: We use analytics cookies to track how visitors navigate the site, measuring performance, page load speeds, and identifying bugs.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Your Choices Regarding Cookies</h2>
          <p style={paragraphStyle}>
            You have the right to decide whether to accept or reject cookies. If you prefer to avoid the use of cookies on this Website, you must first disable the cookie storage in your browser and then delete the cookies saved in your browser associated with this website.
          </p>
          <p style={paragraphStyle}>
            You can modify your web browser controls to accept or refuse cookies. Please visit your browser&apos;s official help pages to manage your preferences:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>For Google Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://support.google.com/chrome/answer/95647</a></li>
            <li>For Apple Safari: <a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://support.apple.com/guide/safari/sfri11471/mac</a></li>
            <li>For Mozilla Firefox: <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop</a></li>
            <li>For Microsoft Edge: <a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd</a></li>
          </ul>
          <p style={paragraphStyle}>
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly. Specifically, you will not be able to log in or complete purchases through Stripe.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions or concerns about our use of cookies, please email us at:
          </p>
          <p style={paragraphStyle}>
            <strong>UUTSY LLC</strong><br />
            Email: support@profaceapp.com<br />
            Mailing Address: 1065 SW 8th St #1993, Miami, FL 33130, USA
          </p>
        </div>
      </div>
    </div>
  );
}
