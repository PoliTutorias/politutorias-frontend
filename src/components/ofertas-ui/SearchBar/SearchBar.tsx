'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

/**
 * Componente SearchBar para búsqueda de ofertas
 *
 * Permite a los estudiantes buscar tutorías por título o nombre del tutor.
 * Actualiza los parámetros de la URL en tiempo real mientras escriben.
 *
 * Features:
 * - Búsqueda en tiempo real con debounce
 * - Permite espacios en blanco, hace trim solo al enviar
 * - Ocupa 50% del ancho de la pantalla
 * - Sin botón de búsqueda, icono integrado
 */
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Estado local para el input (permite espacios)
  // Inicializado con searchTerm de la URL si existe
  const [searchInput, setSearchInput] = useState<string>(
    () => searchParams.get('searchTerm') || ''
  );

  /**
   * Maneja la búsqueda en tiempo real con debounce
   * Se dispara cada que el usuario escribe
   */
  const handleSearchChange = (value: string) => {
    // Permitir escribir espacios en la interfaz
    setSearchInput(value);

    // Limpiar timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Aplicar debounce de 300ms antes de actualizar URL
    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      // Hacer trim solo al momento de la consulta
      const trimmedValue = value.trim();

      if (trimmedValue !== '') {
        params.set('searchTerm', trimmedValue);
      }

      // Actualizar URL
      const queryString = params.toString();
      const newUrl = queryString
        ? `/encuentra-tutoria?${queryString}`
        : '/encuentra-tutoria';
      router.push(newUrl);
    }, 300);
  };

  // Limpiar timer al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
