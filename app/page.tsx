'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaChartLine, FaRocket, FaStar, FaCheck, FaBolt, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import UserNav from '@/components/UserNav';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Example: if you want to redirect unauthenticated users from the landing page, add logic here.
    // For now, do nothing (landing page is public).
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <FaChartLine className="text-2xl text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TradeSensei</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {session && (
                <Link href="/analyze" className="text-gray-600 hover:text-gray-900">
                  Analyze
                </Link>
              )}
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              {session ? (
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              ) : null}
              <UserNav />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 AI-Powered Trading Analysis
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Trade Smarter with
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Analysis
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get instant, professional-grade technical analysis using advanced ICT concepts. 
            Upload your chart, get actionable insights in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={session ? '/analyze' : '/auth/signin'}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Analyzing Free
            </Link>
            <Link
              href="/pricing"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200"
            >
              View Pricing
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 5 free analyses per month • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Trade Better
            </h2>
            <p className="text-xl text-gray-600">
              Powered by Google's Gemini AI and ICT methodology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ICT Analysis</h3>
              <p className="text-gray-700">
                Advanced Inner Circle Trader concepts including order blocks, fair value gaps, 
                and smart money concepts automatically identified.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaBolt className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-700">
                Get comprehensive analysis in seconds. No more spending hours analyzing charts manually. 
                Upload, analyze, trade.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Prompts</h3>
              <p className="text-gray-700">
                Tailor the analysis to your trading style. Use custom prompts to focus on 
                specific aspects that matter most to you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl">
              <div className="bg-yellow-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaChartBar className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Key Levels</h3>
              <p className="text-gray-700">
                Automatically detect support and resistance levels, supply and demand zones, 
                and critical price action areas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <div className="bg-red-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaRocket className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Trading Ideas</h3>
              <p className="text-gray-700">
                Get actionable trade setups with entry points, stop losses, and take profit 
                targets based on current market structure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl">
              <div className="bg-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Risk Management</h3>
              <p className="text-gray-700">
                Built-in risk management insights to help you protect your capital and 
                maximize your risk-reward ratio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get professional analysis in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Chart</h3>
              <p className="text-gray-600">
                Take a screenshot of your trading chart from any platform and upload it to TradeSensei.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Analyzes</h3>
              <p className="text-gray-600">
                Our AI processes your chart using advanced ICT concepts and technical analysis principles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Insights</h3>
              <p className="text-gray-600">
                Receive detailed analysis with order blocks, FVGs, key levels, and actionable trade ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Traders Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "TradeSensei has completely transformed how I analyze charts. The ICT analysis 
                is spot on and saves me hours every day."
              </p>
              <p className="font-semibold text-gray-900">— Sarah M., Day Trader</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The accuracy of the order block detection is incredible. It's like having a 
                professional analyst on demand 24/7."
              </p>
              <p className="font-semibold text-gray-900">— James K., Swing Trader</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Best trading tool I've invested in. The custom prompts let me focus on exactly 
                what I need for my strategy."
              </p>
              <p className="font-semibold text-gray-900">— Mike R., Forex Trader</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join thousands of traders using AI-powered analysis to make better trading decisions.
          </p>
          <Link
            href={session ? '/analyze' : '/auth/signin'}
            className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:-translate-y-1"
          >
            Start Free Today
          </Link>
          <p className="text-sm mt-6 opacity-75">
            5 free analyses • No credit card required • Upgrade anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-2xl text-blue-400" />
                <span className="text-xl font-bold">TradeSensei</span>
              </div>
              <p className="text-gray-400">
                AI-powered trading analysis for smarter decisions.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href={session ? '/analyze' : '/auth/signin'} className="hover:text-white">Analyze</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/legal/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@tradesensei.com" className="hover:text-white">Contact Us</a></li>
                <li><a href="mailto:help@tradesensei.com" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TradeSensei. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
