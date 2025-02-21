'use server';

import Link from 'next/link';
import { getSessionStatus, sessionStatusEnum } from '../lib/session';
import { publicLinks , privateLinks } from '../lib/constants/routes';

export const Navbar = async () => {
  const sessionStatus = await getSessionStatus();

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Vocabulary AI
        </Link>
        <div className="flex space-x-4">
          {sessionStatus === sessionStatusEnum.AUTHENTICATED && privateLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-m hover:underline">
              {label}
            </Link>
          ))}
          {sessionStatus === sessionStatusEnum.GUEST && publicLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-m hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};