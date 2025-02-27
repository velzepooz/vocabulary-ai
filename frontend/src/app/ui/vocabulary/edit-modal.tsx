import React, { useState, useEffect } from 'react';
import { Word } from '@/app/lib/types/vocabulary.types';

interface EditModalProps {
    word: Word | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (word: Word) => void;
    onDelete: (id: number) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ word, isOpen, onClose, onSave, onDelete }) => {
  const [editedWord, setEditedWord] = useState<Word | null>(word);

  useEffect(() => {
    setEditedWord(word);
  }, [word]);

  if (!isOpen || !editedWord) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editedWord) {
      onSave(editedWord);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Word</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Word
            </label>
            <input
              type="text"
              value={editedWord.word}
              onChange={(e) => setEditedWord({ ...editedWord, word: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Definition
            </label>
            <textarea
              value={editedWord.definition}
              onChange={(e) => setEditedWord({ ...editedWord, definition: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to delete this word?')) {
                  onDelete(editedWord.id);
                  onClose();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 