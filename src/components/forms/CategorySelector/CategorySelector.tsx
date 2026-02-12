'use client';

import { useState, useRef, useEffect } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCategories = availableCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedCategories.includes(cat.id)
  );

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map((id) => availableCategories.find((cat) => cat.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const handleSelect = (category: Category) => {
    if (!selectedCategories.includes(category.id) && selectedCategories.length < maxCategories) {
      onSelectCategory(category.id);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    onRemoveCategory(categoryId);
  };

  const isMaxReached = selectedCategories.length >= maxCategories;

  // Cerrar dropdown al clickear fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="relative">
        {/* Input Container with Selected Tags and Search */}
        <div
          onClick={() => !isMaxReached && setIsOpen(true)}
          className={`w-full rounded-md border px-3 py-2 text-sm transition-colors flex flex-wrap items-center gap-2 cursor-text min-h-[42px] ${error
            ? 'border-[var(--error)] focus-within:border-[var(--error)] focus-within:ring-2 focus-within:ring-[var(--error)]/20'
            : 'border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10'
            }`}
        >
          {/* Selected Category Tags */}
          {selectedCategories.length > 0 &&
            getSelectedCategoryNames().map((categoryName, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-3 py-1 text-sm text-white flex-shrink-0"
              >
                <span>{categoryName}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCategory(selectedCategories[index]);
                  }}
                  className="font-bold hover:opacity-80 transition-opacity cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}

          {/* Search Input */}
          <input
            type="text"
            placeholder={
              selectedCategories.length === 0
                ? 'Buscar categorías...'
                : 'Agregar más...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => !isMaxReached && setIsOpen(true)}
            className="flex-grow outline-none text-sm placeholder-gray-400 bg-transparent"
          />

          {/* Count Badge */}
          <span className="text-xs text-[var(--text-secondary)] ml-auto flex-shrink-0">
            {selectedCategories.length}/{maxCategories}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-[var(--border)] bg-white shadow-lg">
            {/* Categories List */}
            <ul className="max-h-48 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        handleSelect(category);
                        setSearchTerm('');
                      }}
                      disabled={isMaxReached}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${isMaxReached
                        ? 'cursor-not-allowed text-gray-300'
                        : 'text-foreground hover:bg-gray-50'
                        }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))
              ) : searchTerm ? (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  No se encontraron categorías
                </div>
              ) : (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  Todas las categorías están seleccionadas
                </div>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}

      {/* Helper Text */}
      {!error && selectedCategories.length === 0 && (
        <p className="text-xs text-[var(--text-secondary)]">
          Selecciona al menos una categoría
        </p>
      )}
    </div>
  );
}
