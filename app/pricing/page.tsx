'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaChartLine, FaHistory, FaCog, FaStar, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: string;
  priceId: string;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    priceId: '',
    interval: 'forever',
    description: 'Get started with basic trading analysis',
    features: [
      '5 chart analyses per month',
      'Basic support and resistance',
      'Standard response time',
      'Community support',
    ],
  },
  {
    name: 'Pro Monthly',
    price: '$20',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY || 'price_monthly',
    interval: 'per month',
    description: 'Perfect for active traders',
    features: [
      'Unlimited chart analyses',
      'Advanced ICT analysis',
      'Order blocks & FVG detection',
      'Custom prompt editor',
      'Priority support',
      'Analysis history',
      'Export results',
    ],
    popular: true,
  },
  {
    name: 'Pro Yearly',
    price: '$200',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY || 'price_yearly',
    interval: 'per year',
    description: 'Save 17% with annual billing',
    features: [
      'Everything in Pro Monthly',
      '2 months free',
      'Priority email support',
      'Early access to new features',
      'Trading strategy templates',
      'Advanced analytics',
    ],
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      router.replace('/auth/signin?from=/pricing');
      return;
    }

    if (!priceId) {
      router.push('/dashboard');
      return;
    }

    setLoading(priceId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock Professional Trading Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered chart analysis using advanced ICT concepts. Get instant insights on order blocks, 
            fair value gaps, and key levels to make smarter trading decisions.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <FaChartLine className="text-blue-600" />
              <span className="text-sm font-semibold">ICT Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <FaRocket className="text-green-600" />
              <span className="text-sm font-semibold">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <FaStar className="text-yellow-600" />
              <span className="text-sm font-semibold">AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 hover:scale-105 ${
                  tier.popular ? 'ring-4 ring-blue-600' : ''
                }`}
              >
                {tier.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-gray-600 ml-2">{tier.interval}</span>
                  </div>
                  <button
                    onClick={() => handleSubscribe(tier.priceId)}
                    disabled={loading === tier.priceId}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      tier.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } ${loading === tier.priceId ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading === tier.priceId
                      ? 'Loading...'
                      : tier.priceId
                      ? 'Get Started'
                      : 'Current Plan'}
                  </button>
                  <ul className="mt-8 space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose TradeSensei?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Analysis</h3>
              <p className="text-gray-600">
                Get professional-grade technical analysis using ICT concepts, order blocks, and smart money techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Upload your chart and get detailed analysis in seconds. No more manual analysis or waiting.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCog className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customizable</h3>
              <p className="text-gray-600">
                Tailor the analysis to your trading style with custom prompts and output settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes! You can cancel your subscription at any time from your dashboard. Your access will continue until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Every account starts with 5 free analyses per month. No credit card required.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Absolutely! You can change your plan at any time from your dashboard. Changes take effect immediately.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 7-day money-back guarantee on all plans. If you\'re not satisfied, contact us for a full refund.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Trading?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of traders using AI-powered analysis to make better decisions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href={session ? '/dashboard' : '/auth/signin'}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="#pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
