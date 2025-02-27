'use server';

import Link from 'next/link';
import { getSessionStatus, sessionStatusEnum } from '../lib/session';
import { publicLinks, privateLinks } from '../lib/constants/routes';
import { signOut } from '../lib/actions/auth/sign-out';

export const Navbar = async () => {
  const sessionStatus = await getSessionStatus();

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Vocabulary AI
        </Link>
        <div className="flex space-x-4 items-center">
          {sessionStatus === sessionStatusEnum.AUTHENTICATED ? (
            <>
              {privateLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-m hover:underline">
                  {label}
                </Link>
              ))}
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-m hover:underline text-red-600 dark:text-red-400"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            publicLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-m hover:underline">
                {label}
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};