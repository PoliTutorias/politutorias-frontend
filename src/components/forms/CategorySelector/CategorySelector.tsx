'use client';

import { useState } from 'react';
import { Category } from '@/interfaces/oferta/Category';

interface CategorySelectorProps {
  selectedCategories: string[];
  onSelectCategory: (categoryId: string) => void;
  onRemoveCategory: (categoryId: string) => void;
  availableCategories: Category[];
  maxCategories?: number;
  error?: string;
}

export function CategorySelector({
  selectedCategories,
  onSelectCategory,
  onRemoveCategory,
  availableCategories,
  maxCategories = 5,
  error,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = availableCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map((id) => availableCategories.find((cat) => cat.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const handleSelect = (category: Category) => {
    if (selectedCategories.includes(category.id)) {
      onRemoveCategory(category.id);
    } else {
      if (selectedCategories.length < maxCategories) {
        onSelectCategory(category.id);
      }
    }
  };

  const isMaxReached = selectedCategories.length >= maxCategories;

  return (
    <div className="space-y-2">
      <div className="relative">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${error
              ? 'border-[var(--error)] focus:border-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--error)]/20'
              : 'border-[var(--border)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              {selectedCategories.length === 0
                ? 'Buscar categorías...'
                : 'Agregar más categorías'}
            </span>
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-[var(--border)] bg-white shadow-lg">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-[var(--border)] px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
            />

            {/* Categories List */}
            <ul className="max-h-48 overflow-y-auto">
              {filteredCategories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(category)}
                    disabled={
                      isMaxReached &&
                      !selectedCategories.includes(category.id)
                    }
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${selectedCategories.includes(category.id)
                        ? 'bg-blue-50 text-[var(--primary)]'
                        : isMaxReached &&
                          !selectedCategories.includes(category.id)
                          ? 'cursor-not-allowed text-gray-300'
                          : 'text-foreground hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        readOnly
                        className="h-4 w-4 rounded"
                      />
                      {category.name}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {filteredCategories.length === 0 && (
              <div className="px-3 py-2 text-center text-sm text-gray-500">
                No se encontraron categorías
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Categories Display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-md border border-[var(--border)] bg-gray-50 p-3">
          {getSelectedCategoryNames().map((categoryName, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-3 py-1 text-sm text-white"
            >
              <span>{categoryName}</span>
              <button
                type="button"
                onClick={() => {
                  const categoryId = selectedCategories[index];
                  onRemoveCategory(categoryId);
                }}
                className="ml-1 font-bold hover:opacity-80"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}

      {/* Helper Text */}
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>
          {isMaxReached
            ? `Máximo de ${maxCategories} categorías alcanzado`
            : 'Selecciona al menos una categoría'}
        </span>
        <span>
          {selectedCategories.length}/{maxCategories}
        </span>
      </div>
    </div>
  );
}
