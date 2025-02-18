import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Vocabulary AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
}

const features = [
  {
    icon: "📱",
    title: "Instant Digitization",
    description: "Upload a photo of your handwritten notes and get digital text in seconds."
  },
  {
    icon: "🎯",
    title: "High Accuracy",
    description: "Advanced AI ensures precise recognition of your handwriting and vocabulary."
  },
  {
    icon: "📚",
    title: "Smart Organization",
    description: "Automatically organizes your vocabulary lists into structured, searchable formats."
  }
];

const steps = [
  {
    title: "Take a Photo",
    description: "Snap a picture of your handwritten vocabulary list using your phone or upload an existing image."
  },
  {
    title: "AI Processing",
    description: "Our AI analyzes your handwriting and converts it into clear, editable digital text."
  },
  {
    title: "Review & Export",
    description: "Edit the digitized text if needed and export it in your preferred format."
  }
];
