'use client';

import { useActionState } from 'react';
import { signIn, State } from '../../lib/actions/sign-in';

export default function SignInForm() {
  const initialState: State = {
    fieldErrors: {},
    generalErrorMessage: null,
  };

  const [state, setFormData] = useActionState(signIn, initialState);

  return (
    <form action={setFormData} className="space-y-4">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue=""
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="email@example.com"
          aria-describedby="email-error"
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.fieldErrors?.email &&
            state.fieldErrors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue=""
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="••••••••"
          aria-describedby="password-error"
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.fieldErrors?.password &&
            state.fieldErrors.password.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {state.generalErrorMessage && (
        <div id="general-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500" key={state.generalErrorMessage}>
            {state.generalErrorMessage}
          </p>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-foreground text-background py-2 px-4 rounded hover:bg-gray-700 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}
