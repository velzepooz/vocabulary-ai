'use client';

import Link from 'next/link';
import SignInForm from '../../ui/auth/sign-in-form';

/**
 * SignIn Component
 * Renders the Sign In form for existing users.
 */
export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Welcome Back
        </h2>
        <SignInForm />
        {/* Link to Sign Up */}
        <p className="mt-4 text-sm text-center text-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
} 