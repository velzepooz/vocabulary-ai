'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Home Component
 * Renders the home page where users can upload images.
 */
export default function Home() {
  // State variables for image upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState<string | null>(null);

  /**
   * Handles file selection
   * @param event - File input change event
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  /**
   * Handles the image upload and processing
   */
  const handleUpload = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProcessedText(null);

    // Simulate image processing delay
    setTimeout(() => {
      // TODO: Integrate with backend API for processing
      setProcessedText('Sample processed vocabulary text from the uploaded image.');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-8">
        {/* Upload Section */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Upload Your Vocabulary</h2>

          {/* Upload Instructions */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">For best results:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>Ensure good lighting and clear handwriting</li>
              <li>Avoid shadows and glare on the page</li>
              <li>Supported formats: JPG, PNG, PDF</li>
            </ul>
          </div>

          {/* Drag and Drop Area */}
          <div
            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-primary"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Image src="/window.svg" alt="Upload Icon" width={64} height={64} />
            <p className="mt-4 text-center">
              <span className="text-primary font-medium">Click to upload</span>
              <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Maximum file size: 10MB
            </p>
            <input
              type="file"
              id="fileInput"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Preview Section */}
          {previewUrl && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Selected File:</p>
              <div className="relative aspect-video w-full max-h-[300px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img src={previewUrl} alt="Selected" className="object-contain w-full h-full" />
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && (
            <button
              onClick={handleUpload}
              className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Process Vocabulary
                </>
              )}
            </button>
          )}

          {/* Results Section */}
          {processedText && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Processed Results</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-800 dark:text-gray-200">{processedText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <h3 className="text-lg font-semibold mb-2">Smart Scanning</h3>
            <p className="text-gray-600 dark:text-gray-300">Upload your handwritten vocabulary and let AI process it with high accuracy</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <h3 className="text-lg font-semibold mb-2">Auto Organization</h3>
            <p className="text-gray-600 dark:text-gray-300">Automatically organize words by categories, difficulty levels, and more</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
            <h3 className="text-lg font-semibold mb-2">Easy Export</h3>
            <p className="text-gray-600 dark:text-gray-300">Export your digitized vocabulary in various formats for easy studying</p>
          </div>
        </div>
      </main>
    </div>
  );
} 