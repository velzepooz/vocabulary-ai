import type { Metadata } from 'next';
import { geistSans, geistMono } from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import { Navbar } from '@/app/ui/navbar';

export const metadata: Metadata = {
  title: 'Vocabulary AI',
  description: 'Convert your handwritten vocabularies into digital text effortlessly.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
