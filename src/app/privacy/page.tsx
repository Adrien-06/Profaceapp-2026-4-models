import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — ProFaceApp',
  description: 'Privacy Policy for ProFaceApp by UUTSY LLC',
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

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: '14px', color: '#888888', marginBottom: '32px' }}>
          Last Updated: May 28, 2026
        </p>

        <p style={paragraphStyle}>
          UUTSY LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website https://profaceapp.com and the Proface App software-as-a-service platform (collectively, the &quot;Service&quot;). We are committed to protecting your privacy and ensuring the security of your personal data.
        </p>
        <p style={{ ...paragraphStyle, marginBottom: '32px' }}>
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. By accessing or using the Service, you consent to the data practices described in this policy.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Data Controller</h2>
          <p style={paragraphStyle}>
            For the purpose of applicable data protection laws (including the General Data Protection Regulation - GDPR), the data controller is:
          </p>
          <p style={paragraphStyle}>
            UUTSY LLC, a Wyoming Limited Liability Company (EIN: 36-5157764).<br />
            Mailing Address: 1065 SW 8th St #1993, Miami, FL 33130, USA.<br />
            Contact Email: support@profaceapp.com
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Information We Collect</h2>
          <p style={paragraphStyle}>
            We collect several types of information from and about users of our Service:
          </p>
          <p style={paragraphStyle}><strong>2.1. Personal Data You Provide to Us:</strong></p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Account Information: Name, email address, and account password when you register.</li>
            <li>Billing Information: If you purchase a subscription or credits, our third-party payment processor (Stripe) collects your credit card number, billing address, and transaction details. We do not store your full financial data on our servers.</li>
            <li>User Input Images: Photographs, selfies, or portrait images that you intentionally upload to the platform to generate professional headshots and avatars.</li>
          </ul>
          <p style={paragraphStyle}><strong>2.2. Automatically Collected Information:</strong></p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Usage Data: Information about how you interact with our Website, including IP addresses, browser types, device information, operating system, pages viewed, and the dates/times of your visits.</li>
            <li>Cookies and Tracking Technologies: We use cookies and similar tracking tools to maintain your login session and analyze platform performance.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. How We Use Your Information</h2>
          <p style={paragraphStyle}>We use the collected data for the following legal and operational purposes:</p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>To provide, maintain, and improve our AI generation services.</li>
            <li>To process your payments and manage your subscriptions via Stripe.</li>
            <li>To communicate with you regarding account updates, support requests, or system notifications.</li>
            <li>To train and operate our AI models temporarily to deliver your Generated Content.</li>
            <li>To comply with applicable legal obligations, tax calculations, and fraud prevention.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Special Notice Regarding Face Images and AI Processing</h2>
          <p style={paragraphStyle}>
            Your biometric privacy is our priority. We handle your uploaded photographs under strict limitations:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>No Permanent Storage of Source Images: The original photos you upload are used solely to train a temporary, isolated AI model profile for your account.</li>
            <li>Automatic Deletion: Your uploaded source photographs and the temporary AI profiles are automatically and permanently deleted from our GPU computing servers within thirty (30) days following the successful completion of your generation request.</li>
            <li>No Unauthorized Use: We will never sell, rent, or use your uploaded face images for third-party marketing, facial recognition databases, or advertising purposes.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Sharing and Disclosure of Your Information</h2>
          <p style={paragraphStyle}>
            We do not sell your personal data. We only share your information with trusted third-party service providers (&quot;Data Processors&quot;) who assist us in operating our SaaS business, under strict confidentiality agreements:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Hosting &amp; Infrastructure: Vercel Inc. (for hosting the web application) and AWS/RunPod/Replicate (secure cloud GPU providers used to run the AI image generation).</li>
            <li>Payment Processing: Stripe Inc. (to safely process payments and calculate regional taxes).</li>
            <li>Analytics: Google Analytics (to understand traffic and improve user experience).</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. International Data Transfers</h2>
          <p style={paragraphStyle}>
            UUTSY LLC is located in the United States. Information we collect will be processed and stored in the United States. If you are accessing our Service from the European Union, United Kingdom, or other regions with laws governing data collection and use, please note that you are transferring your personal data to a country that may not have the same data protection laws as your jurisdiction. We utilize appropriate safeguards, such as Standard Contractual Clauses, to ensure your data remains protected.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Your Rights Under GDPR (European Users)</h2>
          <p style={paragraphStyle}>
            If you are a resident of the European Economic Area (EEA), you possess specific rights regarding your personal data under the General Data Protection Regulation:
          </p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Right of Access: You can request a copy of the personal data we hold about you.</li>
            <li>Right to Rectification: You can request that we correct inaccurate or incomplete data.</li>
            <li>Right to Erasure (&quot;Right to be Forgotten&quot;): You can request that we delete your account and all associated personal data from our systems.</li>
            <li>Right to Data Portability: You can request a digital copy of your data in a structured, machine-readable format.</li>
            <li>Right to Withdraw Consent: Where processing is based on your consent, you have the right to withdraw it at any time.</li>
          </ul>
          <p style={paragraphStyle}>
            To exercise any of these rights, please email us at support@profaceapp.com. We will respond to your request within thirty (30) days.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Data Security</h2>
          <p style={paragraphStyle}>
            We implement industry-standard technical and organizational security measures (such as SSL/TLS encryption for data transmission) to protect your personal data from unauthorized access, loss, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Retention of Data</h2>
          <p style={paragraphStyle}>
            We retain your account information (name, email, subscription history) for as long as your account is active or as needed to provide you with the Service. We retain transaction data as required by law for accounting and corporate tax purposes. As stated in Section 4, your uploaded source images are purged automatically within 30 days.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Changes to This Privacy Policy</h2>
          <p style={paragraphStyle}>
            We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. When we post modifications, we will revise the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>11. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p style={paragraphStyle}>
            <strong>UUTSY LLC</strong><br />
            Email: support@profaceapp.com<br />
            Postal Address: 1065 SW 8th St #1993, Miami, FL 33130, USA
          </p>
        </div>
      </div>
    </div>
  );
}
