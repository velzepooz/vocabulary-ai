import { FeatureItem } from '@/types';

const features: FeatureItem[] = [
  {
    icon: '📱',
    title: 'Instant Digitization',
    description: 'Upload a photo of your handwritten notes and get digital text in seconds.'
  },
  {
    icon: '🎯',
    title: 'High Accuracy',
    description: 'Advanced AI ensures precise recognition of your handwriting and vocabulary.'
  },
  {
    icon: '📚',
    title: 'Smart Organization',
    description: 'Automatically organizes your vocabulary lists into structured, searchable formats.'
  }
];

export default function Features() {
  return (
    <section className="py-20 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Vocabulary AI?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition flex flex-col items-center text-center"
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
  );
} 