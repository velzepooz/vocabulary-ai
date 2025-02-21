import Link from 'next/link';
import { SignUpForm } from '../../ui/auth/sign-up-form';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Create Your Account
        </h2>
        <SignUpForm />

        {/* Link to Sign In */}
        <p className="mt-4 text-sm text-center text-foreground">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
} 