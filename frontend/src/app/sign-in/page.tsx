"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * SignIn Component
 * Renders the Sign In form for existing users.
 */
export default function SignIn() {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles form submission
   * @param event - Form submission event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add authentication logic
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-foreground text-background py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="mt-4 text-sm text-center text-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
} 