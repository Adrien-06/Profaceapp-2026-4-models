import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — ProFaceApp',
  description: 'Terms of Service for ProFaceApp by UUTSY LLC',
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

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: '14px', color: '#888888', marginBottom: '8px' }}>
          Last Updated: May 28, 2026
        </p>
        <p style={{ fontSize: '15px', color: '#444444', marginBottom: '32px' }}>
          Welcome to Proface App!
        </p>

        <p style={paragraphStyle}>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot; or &quot;you&quot;) and UUTSY LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a Wyoming limited liability company (EIN: 36-5157764), regarding your access to and use of the website https://profaceapp.com and the Proface App software-as-a-service platform (collectively, the &quot;Service&quot;).
        </p>
        <p style={{ ...paragraphStyle, marginBottom: '32px' }}>
          By creating an account, purchasing a subscription, or using the Service, you explicitly agree to be bound by these Terms. If you do not agree, you must immediately cease using the Service.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Eligibility and Account Registration</h2>
          <p style={paragraphStyle}>
            1.1. Age Requirements: You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account and use the Service.
          </p>
          <p style={paragraphStyle}>
            1.2. Account Security: You are solely responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately at support@profaceapp.com of any unauthorized use of your account.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Description of the Service</h2>
          <p style={paragraphStyle}>
            Proface App is an AI-powered software-as-a-service (SaaS) tool designed to process user-uploaded photographs and generate professional business headshots, avatars, and enhanced digital images (&quot;Generated Content&quot;).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Pricing, Payments, and Subscriptions</h2>
          <p style={paragraphStyle}>
            3.1. Pricing: Pricing for credits, packages, or recurring subscriptions is displayed on the Website. All prices are denominated in US Dollars (USD) unless specified otherwise. We reserve the right to change our pricing at any time.
          </p>
          <p style={paragraphStyle}>
            3.2. Payment Processing: Payments are securely processed through our third-party billing merchant, Stripe. By purchasing, you authorize Stripe to charge your designated payment method.
          </p>
          <p style={paragraphStyle}>
            3.3. Taxes: Depending on your geographical location and status (Personal Use / B2C vs. Business Use / B2B), applicable Sales Tax or Value Added Tax (VAT) may be calculated and added to your final checkout price or included automatically, in compliance with regional tax rules.
          </p>
          <p style={paragraphStyle}>
            3.4. Subscriptions and Cancellations: If you purchase a recurring plan, your payment method will be charged automatically at the start of each billing cycle. You can cancel your subscription at any time via your account settings or by contacting billing support. Cancellations apply to the next billing cycle.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. No-Refund Policy</h2>
          <p style={paragraphStyle}>
            Due to the substantial computational resources and server costs required to process images and train AI models instantly, ALL SALES ARE FINAL. We do not offer refunds once AI generation credits have been consumed or a generation process has been initiated by the user.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Content Ownership and Intellectual Property</h2>
          <p style={paragraphStyle}>
            5.1. User Input: You retain all rights, title, and interest in the original photographs and data you upload to the Service (&quot;User Input&quot;). You represent and warrant that you own or have the legal right to use and upload the User Input.
          </p>
          <p style={paragraphStyle}>
            5.2. Generated Content: Subject to your full compliance with these Terms and complete payment of applicable fees, UUTSY LLC hereby assigns to you all its rights, title, and interest in and to the specific Generated Content created for you by the platform. You may use your Generated Content for both personal and commercial purposes.
          </p>
          <p style={paragraphStyle}>
            5.3. Platform IP: The Service, including its algorithms, software, user interfaces, design, and website code, is the exclusive property of UUTSY LLC and its licensors.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Prohibited Conduct</h2>
          <p style={paragraphStyle}>You agree not to use the Service to:</p>
          <ul style={{ ...paragraphStyle, paddingLeft: '20px' }}>
            <li>Upload photos of individuals without their explicit prior consent.</li>
            <li>Generate pornographic, sexually explicit, defamatory, hateful, violent, or unlawful content.</li>
            <li>Reverse engineer, decompile, crawl, or attempt to extract the source code or underlying AI models of the Service.</li>
            <li>Share your account with third parties to bypass purchasing restrictions.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Privacy and Data Protection</h2>
          <p style={paragraphStyle}>
            Your privacy is important to us. Our collection, processing, and use of your personal data and uploaded imagery are governed by our Privacy Policy, which is compliant with applicable data regulations, including the General Data Protection Regulation (GDPR) for European users.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Disclaimer of Warranties</h2>
          <p style={paragraphStyle}>
            THE SERVICE AND ALL GENERATED CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. UUTSY LLC MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR THAT THE GENERATED IMAGE WILL PERFECTLY RESEMBLE THE USER OR MEET SPECIFIC EXPECTATIONS.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Limitation of Liability</h2>
          <p style={paragraphStyle}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL UUTSY LLC, ITS MEMBERS, OR EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR FOR LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO THE COMPANY IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Governing Law and Jurisdiction</h2>
          <p style={paragraphStyle}>
            These Terms and any dispute arising out of your use of the Service shall be governed by, and construed in accordance with, the laws of the State of Wyoming, USA, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the state or federal courts located in Wyoming.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>11. Modifications to Terms</h2>
          <p style={paragraphStyle}>
            We reserve the right to modify or replace these Terms at any time. We will provide notice of material changes by updating the &quot;Last Updated&quot; date at the top of this document. Continued use of the Service after changes constitute your acceptance of the updated Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>12. Contact Information</h2>
          <p style={paragraphStyle}>
            For any questions, legal inquiries, or support requests regarding these Terms, please contact us at:
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
