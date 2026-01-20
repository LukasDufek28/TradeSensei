'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaCrown, FaCreditCard, FaHistory, FaChartLine, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

interface SubscriptionData {
  status: string;
  plan: string | null;
  stripeCurrentPeriodEnd: string | null;
  isActive: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin?from=/dashboard');
    }
    // Do nothing if loading or authenticated
  }, [status, router]);

  useEffect(() => {
    if (session) {
      // In a real app, you'd fetch subscription data from an API
      // For now, we'll use the session data
      setSubscription({
        status: session.user.isPremium ? 'active' : 'inactive',
        plan: session.user.isPremium ? 'pro' : null,
        stripeCurrentPeriodEnd: null,
        isActive: session.user.isPremium || false,
      });
      setLoading(false);
    }
  }, [session]);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to open billing portal');
      setPortalLoading(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">
              TradeSensei
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Analyze
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-600">Manage your subscription and account settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaChartLine className="text-3xl text-blue-600" />
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {subscription?.isActive ? '∞' : '5'}
            </div>
            <div className="text-sm text-gray-600">
              {subscription?.isActive ? 'Unlimited analyses' : 'Free analyses remaining'}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaHistory className="text-3xl text-green-600" />
              <span className="text-sm text-gray-500">All Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Total analyses</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaCrown className="text-3xl text-yellow-600" />
              <span className="text-sm text-gray-500">Status</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {subscription?.isActive ? 'Premium' : 'Free'}
            </div>
            <div className="text-sm text-gray-600">Current plan</div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscription Status
              </h2>
              <p className="text-gray-600">
                {subscription?.isActive
                  ? 'You have access to all premium features'
                  : 'Upgrade to unlock unlimited analyses'}
              </p>
            </div>
            {subscription?.isActive && (
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                Active
              </span>
            )}
          </div>

          <div className="border-t pt-6">
            {subscription?.isActive ? (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Plan</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {subscription.plan || 'Premium'}
                  </p>
                </div>
                {subscription.stripeCurrentPeriodEnd && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Renews on</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  className="flex items-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <FaCreditCard />
                  {portalLoading ? 'Loading...' : 'Manage Billing'}
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  Get unlimited access to all features with a premium subscription.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <FaCrown />
                  Upgrade to Premium
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
            >
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaChartLine className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">New Analysis</h3>
                <p className="text-sm text-gray-600">Upload and analyze a chart</p>
              </div>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all"
            >
              <div className="bg-green-100 p-3 rounded-lg">
                <FaHistory className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View History</h3>
                <p className="text-sm text-gray-600">See your past analyses</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
