'use client';

import { useActionState } from 'react';
import { signUp, State } from '@/app/lib/actions/sign-up';

export function SignUpForm() {
  const initialState: State = {
    fieldErrors: {},
    generalErrorMessage: null,
  };

  const [state, setFormData] = useActionState(signUp, initialState);

  return (
    <form action={setFormData} className="space-y-4">
      {/* First Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue=""
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="First Name"
          aria-describedby="firstName-error"
        />
        <div id="firstName-error" aria-live="polite" aria-atomic="true">
          {state.fieldErrors?.firstName &&
            state.fieldErrors.firstName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Last Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue=""
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="Last Name"
          aria-describedby="lastName-error"
        />
        <div id="lastName-error" aria-live="polite" aria-atomic="true">
          {state.fieldErrors?.lastName &&
            state.fieldErrors.lastName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

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
          placeholder="you@example.com"
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
          minLength={6}
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

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          defaultValue=""
          minLength={6}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="••••••••"
          aria-describedby="confirmPassword-error"
        />
        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
          {state.fieldErrors?.confirmPassword &&
            state.fieldErrors.confirmPassword.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.generalErrorMessage &&
          <p className="mt-2 text-sm text-red-500" key={state.generalErrorMessage}>
            {state.generalErrorMessage}
          </p>
        }
      </div>
      <button
        type="submit"
        className="w-full bg-foreground text-background py-2 px-4 rounded hover:bg-gray-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  )
}