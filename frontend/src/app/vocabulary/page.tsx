'use client';

import { useActionState, useEffect, useState, startTransition } from 'react';
import { Word } from '../lib/types/vocabulary.types';
import { EditModal } from '../ui/vocabulary/edit-modal';
import { SearchBar } from '../ui/vocabulary/search-bar';
import { WordList } from '../ui/vocabulary/word-list';
import { Pagination } from '../ui/vocabulary/pagination';
import { getWords } from '../lib/actions/vocabulary/get-words';
import { LoadingState } from '../ui/vocabulary/loading';

export default function Vocabulary() {
  const [words, setWords, isLoading] = useActionState(getWords, []);

  useEffect(() => {
    startTransition(() => {
      setWords();
    });
  }, [setWords]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [expandedWord, setExpandedWord] = useState<number | null>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleExport = (format: string) => {
    setShowExportDropdown(false);
    // Uncomment when API is ready
    // exportWords(filteredWords, format);
    console.log(`Exporting in ${format} format`);
  };

  const handleEditWord = (word: Word) => {
    setEditingWord(word);
  };

  const handleSaveWord = (updatedWord: Word) => {
    setWords(words.map(w => w.id === updatedWord.id ? updatedWord : w));
  };

  const handleDeleteWord = (id: number) => {
    setWords(words.filter(w => w.id !== id));
  };

  const toggleWordExpansion = (wordId: number) => {
    setExpandedWord(expandedWord === wordId ? null : wordId);
  };

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastWord = currentPage * itemsPerPage;
  const indexOfFirstWord = indexOfLastWord - itemsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Vocabulary List
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onExport={handleExport}
          showExportDropdown={showExportDropdown}
          setShowExportDropdown={setShowExportDropdown}
        />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <WordList
          words={currentWords}
          expandedWord={expandedWord}
          onToggleExpansion={toggleWordExpansion}
          onEditWord={handleEditWord}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <EditModal
        word={editingWord}
        isOpen={editingWord !== null}
        onClose={() => setEditingWord(null)}
        onSave={handleSaveWord}
        onDelete={handleDeleteWord}
      />
    </div>
  );
}
;

