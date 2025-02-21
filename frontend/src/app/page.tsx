import Hero from './ui/index/hero';
import Features from './ui/index/features';
import HowItWorks from './ui/index/how-it-works';
import CTA from './ui/index/cta';

export const metadata = {
  title: 'Vocabulary AI - Transform Handwritten Notes to Digital Text',
  description: 'Convert your handwritten vocabulary lists into organized digital text using advanced AI technology.',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}
