import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Transform Your Handwritten Notes into Digital Text
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Vocabulary AI uses advanced AI to convert your handwritten vocabulary lists
          into organized digital text, making learning and revision effortless.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-up"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Get Started Free
          </Link>
          <Link
            href="#how-it-works"
            className="border border-black px-8 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
} 