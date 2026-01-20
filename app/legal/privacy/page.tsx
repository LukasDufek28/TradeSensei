import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 20, 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              TradeSensei ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
            <p>When you sign in with Google, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture</li>
              <li>Google account ID</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Usage Data</h3>
            <p>We automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chart images you upload for analysis</li>
              <li>Analysis results and history</li>
              <li>Custom prompts and settings</li>
              <li>Device information and IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Payment Information</h3>
            <p>
              Payment information is processed by Stripe. We do not store your credit card details. 
              We only store your Stripe customer ID and subscription status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain the Service</li>
              <li>Process your chart analyses</li>
              <li>Manage your account and subscription</li>
              <li>Send you service-related notifications</li>
              <li>Respond to your comments and questions</li>
              <li>Improve and optimize the Service</li>
              <li>Monitor usage and detect technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. 
              Your data is stored securely and encrypted in transit using SSL/TLS.
            </p>
            <p>
              However, no method of transmission over the Internet is 100% secure. While we strive to 
              protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Google (authentication), Stripe (payments), 
                Google Gemini AI (chart analysis)
              </li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Data Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise these rights, contact us at privacy@tradesensei.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed 
              to provide you services. When you delete your account, we will delete or anonymize your 
              personal information within 30 days, unless we are required to retain it for legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and 
              store certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p>Our Service integrates with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google:</strong> For authentication and AI analysis</li>
              <li><strong>Stripe:</strong> For payment processing</li>
            </ul>
            <p>
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p>
              Our Service is not intended for users under 18 years of age. We do not knowingly 
              collect personal information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@tradesensei.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
