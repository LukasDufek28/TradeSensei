import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 20, 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TradeSensei ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              TradeSensei provides AI-powered trading chart analysis using advanced technical analysis concepts 
              including ICT (Inner Circle Trader) methodology, order blocks, fair value gaps, and key support/resistance levels.
            </p>
            <p>
              <strong>Important Disclaimer:</strong> The analysis provided by TradeSensei is for educational and 
              informational purposes only and should not be considered financial advice. Trading involves substantial 
              risk and may not be suitable for everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p>
              To use certain features of the Service, you must register for an account using Google authentication. 
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payment</h2>
            <p>
              TradeSensei offers both free and paid subscription plans:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Plan:</strong> Limited to 5 chart analyses per month</li>
              <li><strong>Paid Plans:</strong> Unlimited analyses and premium features</li>
            </ul>
            <p>
              Payment is processed securely through Stripe. Subscriptions automatically renew unless canceled. 
              You may cancel your subscription at any time from your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
            <p>
              We offer a 7-day money-back guarantee on all paid plans. To request a refund, contact us at 
              support@tradesensei.com within 7 days of your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Share your account credentials with others</li>
              <li>Resell or redistribute the analysis results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by TradeSensei 
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p>
              TradeSensei and its affiliates shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or inability to use the Service, 
              including but not limited to trading losses based on the analysis provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes via email. Your continued use of the Service after such modifications constitutes your 
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: support@tradesensei.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
