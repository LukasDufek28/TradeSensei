'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserNav() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {session.user.image && (
        <img
          src={session.user.image}
          alt={session.user.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
      )}
      <span className="text-sm text-gray-700">{session.user.name}</span>
      {session.user.isPremium && (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
          PREMIUM
        </span>
      )}
    </div>
  );
}
