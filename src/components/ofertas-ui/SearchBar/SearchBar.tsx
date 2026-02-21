'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

/**
 * Componente SearchBar para búsqueda de ofertas
 *
 * Permite a los estudiantes buscar tutorías por título o nombre del tutor.
 * Actualiza los parámetros de la URL en tiempo real mientras escriben.
 *
 * Features:
 * - Búsqueda en tiempo real (onChange)
 * - Ocupa 50% del ancho de la pantalla
 * - Sin botón de búsqueda, icono integrado
 * - Inicialización con valores de URL existentes
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
   * Maneja la búsqueda en tiempo real
   * Se dispara cada que el usuario escribe
   */
  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    // Actualizar URL en tiempo real
    const params = new URLSearchParams();

    if (value.trim() !== '') {
      params.set('searchTerm', value.trim());
    }

    // Actualizar URL sin recargar
    const queryString = params.toString();
    const newUrl = queryString
      ? `/encuentra-tutoria?${queryString}`
      : '/encuentra-tutoria';
    router.push(newUrl);
  };

  return (
    <div className="flex items-center mb-6 w-1/2">
      {/* Input de búsqueda con icono integrado */}
      <div className="relative w-full">
        <FiSearch
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]"
        />
        <input
          type="text"
          placeholder="Buscar por materia, tutor..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-[var(--input-border)] rounded-lg focus:outline-none focus:border-[var(--input-border-focus)] focus:ring-1 focus:ring-[var(--input-border-focus)] font-inter text-base text-[var(--foreground)]"
        />
      </div>
    </div>
  );
}
