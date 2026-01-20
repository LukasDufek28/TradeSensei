'use client';

import { signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

export default function SignOutButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
    >
      <FaSignOutAlt />
      Sign Out
    </button>
  );
}
