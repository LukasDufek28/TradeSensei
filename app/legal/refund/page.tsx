import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 20, 2026</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 7-Day Money-Back Guarantee</h2>
            <p>
              We offer a 7-day money-back guarantee on all paid subscription plans. If you're not 
              satisfied with TradeSensei for any reason, you can request a full refund within 7 days 
              of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility Requirements</h2>
            <p>To be eligible for a refund, you must meet the following criteria:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request must be made within 7 days of the original purchase date</li>
              <li>This is your first subscription to TradeSensei</li>
              <li>You have not previously received a refund from us</li>
              <li>Your account has not been terminated for violation of our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How to Request a Refund</h2>
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email us at refunds@tradesensei.com</li>
              <li>Include your account email address</li>
              <li>Provide your order/transaction ID (found in your Stripe receipt)</li>
              <li>Briefly explain the reason for your refund request (optional but helpful)</li>
            </ol>
            <p className="mt-4">
              We aim to process all refund requests within 2-3 business days. You will receive 
              a confirmation email once your refund has been processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Processing</h2>
            <p>
              Refunds are processed through Stripe and will be returned to your original payment method. 
              Depending on your bank or card issuer, it may take 5-10 business days for the refund to 
              appear in your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription Cancellations</h2>
            <p>
              You can cancel your subscription at any time from your dashboard. When you cancel:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will retain access to premium features until the end of your current billing period</li>
              <li>You will not be charged for subsequent billing cycles</li>
              <li>No refund will be issued for the remaining time in your current billing period</li>
              <li>Your account will automatically revert to the free plan at the end of the period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Annual Subscriptions</h2>
            <p>
              For annual subscriptions, the 7-day money-back guarantee applies from the date of purchase. 
              After the 7-day window, annual subscriptions are non-refundable, but you can cancel to 
              prevent renewal for the next year.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Exceptions</h2>
            <p>Refunds will not be issued in the following cases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Requests made after the 7-day guarantee period</li>
              <li>Change of mind after the guarantee period</li>
              <li>Failure to cancel a subscription before renewal</li>
              <li>Accounts terminated for Terms of Service violations</li>
              <li>Repeated refund requests (abuse of the refund policy)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Chargebacks</h2>
            <p>
              Please contact us directly before initiating a chargeback with your bank. Chargebacks 
              can result in immediate account suspension and may incur additional processing fees. 
              We're committed to resolving any billing issues fairly and promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Technical Issues</h2>
            <p>
              If you experience technical issues with the Service, please contact our support team 
              at support@tradesensei.com. We will work to resolve the issue promptly. Technical 
              issues do not automatically qualify for a refund outside the 7-day guarantee period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Free Trials</h2>
            <p>
              Our free plan does not require a credit card and has no trial period. If we offer 
              promotional free trials in the future, you will be notified before any charges occur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Policy Changes</h2>
            <p>
              We reserve the right to modify this Refund Policy at any time. Changes will be effective 
              immediately upon posting. Your continued use of the Service after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p>
              For refund requests or questions about this policy, please contact us at:
              <br />
              Email: refunds@tradesensei.com
              <br />
              Support: support@tradesensei.com
            </p>
            <p className="mt-4">
              We typically respond to refund requests within 24-48 hours during business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
