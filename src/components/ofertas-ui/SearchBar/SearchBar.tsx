'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

/**
 * Componente SearchBar para búsqueda de ofertas
 *
 * Permite a los estudiantes buscar tutorías por título o nombre del tutor.
 * Actualiza los parámetros de la URL cuando el usuario realiza una búsqueda,
 * lo que dispara un re-render del Server Component OfertasPage.
 *
 * Features:
 * - Búsqueda por Enter o clic en el icono de búsqueda
 * - Inicialización con valores de URL existentes
 * - Limpieza de parámetros si el campo se deja vacío
 */
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado local para el input
  const [searchInput, setSearchInput] = useState<string>('');

  // Inicializar con searchTerm de la URL si existe
  useEffect(() => {
    const currentSearchTerm = searchParams.get('searchTerm') || '';
    setSearchInput(currentSearchTerm);
  }, [searchParams]);

  /**
   * Maneja la lógica de búsqueda
   * Actualiza la URL con el nuevo searchTerm o lo elimina si está vacío
   */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchInput.trim() !== '') {
      params.set('searchTerm', searchInput.trim());
    }
    // Si está vacío, no añadimos el parámetro

    // Actualizar URL y disparar re-render
    const queryString = params.toString();
    router.push(queryString ? `/ofertas?${queryString}` : '/ofertas');
  };

  /**
   * Manejar la tecla Enter en el input
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Input de búsqueda */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar por materia, tutor..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 border border-[var(--input-border)] rounded-lg focus:outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] font-inter text-base text-[var(--foreground)]"
        />
      </div>

      {/* Botón de búsqueda con icono */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors font-inter font-medium"
        aria-label="Buscar"
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}
