import { Step } from '@/app/lib/types/index-page.types';

const steps: Step[] = [
  {
    title: 'Take a Photo',
    description: 'Snap a picture of your handwritten vocabulary list using your phone or upload an existing image.'
  },
  {
    title: 'AI Processing',
    description: 'Our AI analyzes your handwriting and converts it into clear, editable digital text.'
  },
  {
    title: 'Review & Export',
    description: 'Edit the digitized text if needed and export it in your preferred format.'
  }
];

export default function HowItWorks() {
  return (
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
  );
} 