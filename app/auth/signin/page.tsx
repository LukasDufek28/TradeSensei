'use client';

export const dynamic = "force-dynamic";
'use client';

import { signIn, useSession } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';


function SignInInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('from') || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to TradeSensei
          </h1>
          <p className="text-gray-600">
            Sign in to access premium trading analysis
          </p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
        >
          <FaGoogle className="text-xl" />
          Sign in with Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          By signing in, you agree to our{' '}
          <a href="/legal/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/legal/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInInner />
    </Suspense>
  );
}
