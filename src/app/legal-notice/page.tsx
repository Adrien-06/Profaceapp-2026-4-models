import Link from 'next/link';

export const metadata = {
  title: 'Legal Notice — ProFaceApp',
  description: 'Legal Notice for ProFaceApp by UUTSY LLC',
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

const paragraphStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#444444',
  margin: '0 0 12px 0',
};

export default function LegalNoticePage() {
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

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111111', margin: '24px 0 32px 0' }}>
          Legal Notice
        </h1>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Website Operator</h2>
          <p style={paragraphStyle}>
            The website https://profaceapp.com (hereinafter the &quot;Website&quot;) and the associated Proface App software-as-a-service application are operated and published by:
          </p>
          <p style={paragraphStyle}>
            <strong>UUTSY LLC</strong>, a Wyoming Limited Liability Company.
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>State of Organization: Wyoming, USA</li>
            <li>Certificate of Organization ID: 2025-001805046</li>
            <li>Employer Identification Number (EIN): 36-5157764</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Company Addresses</h2>
          <p style={paragraphStyle}>
            <strong>Registered Agent &amp; Legal Office Address:</strong><br />
            Registered Agents Inc<br />
            30 N Gould St Ste R<br />
            Sheridan, WY 82801, USA
          </p>
          <p style={paragraphStyle}>
            <strong>Principal &amp; Mailing Address:</strong><br />
            1065 SW 8th St #1993<br />
            Miami, FL 33130, USA
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Contact</h2>
          <p style={paragraphStyle}>
            Contact Email: support@profaceapp.com
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Website Hosting</h2>
          <p style={paragraphStyle}>
            The Website and services are hosted by:
          </p>
          <p style={paragraphStyle}>
            <strong>Vercel Inc.</strong><br />
            650 2nd St, San Francisco, CA 94107, USA<br />
            Website: https://vercel.com
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Intellectual Property Notice</h2>
          <p style={paragraphStyle}>
            All trademarks, logos, texts, graphics, user interfaces, visual interfaces, photographs, and computer code on this Website are owned, controlled, or licensed by or to UUTSY LLC and are protected by copyright, patent, and trademark laws, and various other intellectual property rights.
          </p>
        </div>
      </div>
    </div>
  );
}
