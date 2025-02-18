import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocabulary AI",
  description: "Convert your handwritten vocabularies into digital text effortlessly.",
};

/**
 * RootLayout Component
 * Wraps all pages with shared layout elements.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Navigation Bar */}
        <nav className="w-full bg-white dark:bg-gray-800 shadow p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Vocabulary AI
            </Link>
            <div className="flex space-x-4">
              <Link href="/home" className="text-m hover:underline">
                Home
              </Link>
              <Link href="/sign-up" className="text-m hover:underline">
                Sign Up
              </Link>
              <Link href="/sign-in" className="text-m hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
