import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onExport: (format: string) => void;
    showExportDropdown: boolean;
    setShowExportDropdown: (show: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  onExport,
  showExportDropdown,
  setShowExportDropdown,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search words..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={onSearch}
      />

      <div className="relative">
        <button
          onClick={() => setShowExportDropdown(!showExportDropdown)}
          className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          Export
        </button>

        {showExportDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
            <button
              onClick={() => onExport('csv')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
            >
              CSV
            </button>
            <button
              onClick={() => onExport('json')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
            >
              JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 