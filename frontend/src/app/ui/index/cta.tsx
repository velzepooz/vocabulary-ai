import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Digitize Your Vocabulary Lists?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of students who are already using Vocabulary AI to enhance their learning experience.
        </p>
        <Link
          href="/sign-up"
          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition inline-block"
        >
          Start Your Free Trial
        </Link>
      </div>
    </section>
  );
} 