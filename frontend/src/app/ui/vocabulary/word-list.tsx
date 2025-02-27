import React from 'react';
import Link from 'next/link';
import { Word } from '@/app/lib/types/vocabulary.types';

interface WordListProps {
  words: Word[];
  expandedWord: number | null;
  onToggleExpansion: (wordId: number) => void;
  onEditWord: (word: Word) => void;
}

export const WordList: React.FC<WordListProps> = ({
  words,
  expandedWord,
  onToggleExpansion,
  onEditWord,
}) => {
  if (words.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 mb-2">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No words yet</h3>
        <p className="text-gray-500 mb-4">Start by adding your first word to the vocabulary list.</p>
        <Link
          href="/home"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr,2fr,auto] md:grid-cols-[1fr,3fr,auto] gap-4 px-6 py-3 bg-gray-50 border-b">
        <div className="font-semibold text-gray-900">Word</div>
        <div className="font-semibold text-gray-900">Definition</div>
        <div className="font-semibold text-gray-900">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {words.map((word) => (
          <div key={word.id}>
            <div className="grid grid-cols-[1fr,2fr,auto] md:grid-cols-[1fr,3fr,auto] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <button
                onClick={() => onToggleExpansion(word.id)}
                className="contents text-left"
              >
                <div className="font-medium text-gray-800">{word.word}</div>
                <div className="text-gray-600 truncate">
                  {word.definition}
                  {word.definition.length > 100 && expandedWord !== word.id && '...'}
                </div>
              </button>
              <div>
                <button
                  onClick={() => onEditWord(word)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Expanded View */}
            {expandedWord === word.id && (
              <div className="px-6 py-3 bg-gray-50">
                <div className="text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium">Full Definition:</span>{' '}
                    {word.definition}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 