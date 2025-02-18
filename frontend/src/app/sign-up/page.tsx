"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * SignUp Component
 * Renders the Sign Up form for new users.
 */
export default function SignUp() {
  // State variables for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Handles form submission
   * @param event - Form submission event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add form validation and submission logic
    console.log({ fullName, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              placeholder="John Doe"
            />
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>
        </form>

        {/* Link to Sign In */}
        <p className="mt-4 text-sm text-center text-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
} 