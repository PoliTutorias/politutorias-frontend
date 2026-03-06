'use client';

import { useState, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { experienciaSeedData } from '@/seed/ExperienciaSeedData';
import { FormNuevaExperienciaInline } from '@/components/registro/form-nueva-experiencia-inline/FormNuevaExperienciaInline';
import { TarjetaExperiencia } from '@/components/registro/tarjeta-experiencia/TarjetaExperiencia';

interface FormDetallesProfesionalesProps {
  onExperienciasChange?: (experiencias: Experiencia[]) => void;
  onMateriasChange?: (materias: string[]) => void;
}

// Constantes para localStorage
const LS_KEY_EXPERIENCIAS = 'tutor_registro_experiencias';
const LS_KEY_MATERIAS = 'tutor_registro_materias';

export function FormDetallesProfesionales({ onExperienciasChange, onMateriasChange }: FormDetallesProfesionalesProps) {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [materias, setMaterias] = useState<string[]>([]);
  const [materiaInput, setMateriaInput] = useState('');
  const [showFormExperiencia, setShowFormExperiencia] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const experienciasLS = localStorage.getItem(LS_KEY_EXPERIENCIAS);
      const materiasLS = localStorage.getItem(LS_KEY_MATERIAS);

      if (experienciasLS) {
        const experienciasParseadas = JSON.parse(experienciasLS);
        setExperiencias(experienciasParseadas);
        onExperienciasChange?.(experienciasParseadas);
      } else {
        // Usar seed data como fallback
        setExperiencias(experienciaSeedData);
        onExperienciasChange?.(experienciaSeedData);
      }

      if (materiasLS) {
        const materiasParseadas = JSON.parse(materiasLS);
        setMaterias(materiasParseadas);
        onMateriasChange?.(materiasParseadas);
      }
    } catch (error) {
      console.error('Error cargando datos de localStorage:', error);
      // Fallback a seed data
      setExperiencias(experienciaSeedData);
      onExperienciasChange?.(experienciaSeedData);
    }
    setIsLoaded(true);
  }, []);

  // Guardar experiencias en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LS_KEY_EXPERIENCIAS, JSON.stringify(experiencias));
        onExperienciasChange?.(experiencias);
      } catch (error) {
        console.error('Error guardando experiencias en localStorage:', error);
      }
    }
  }, [experiencias, isLoaded, onExperienciasChange]);

  // Guardar materias en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LS_KEY_MATERIAS, JSON.stringify(materias));
        onMateriasChange?.(materias);
      } catch (error) {
        console.error('Error guardando materias en localStorage:', error);
      }
    }
  }, [materias, isLoaded, onMateriasChange]);

  const handleExperienciaGuardada = (experiencia: Experiencia) => {
    setExperiencias([...experiencias, experiencia]);
    setShowFormExperiencia(false);
  };

  const handleEliminarExperiencia = (indexToDelete: number) => {
    setExperiencias(experiencias.filter((_, index) => index !== indexToDelete));
  };

  const handleAgregarMateria = () => {
    const materiaLimpia = materiaInput.trim();
    if (materiaLimpia && !materias.includes(materiaLimpia)) {
      setMaterias([...materias, materiaLimpia]);
      setMateriaInput('');
    }
  };

  const handleEliminarMateria = (materiaToDelete: string) => {
    setMaterias(materias.filter((m) => m !== materiaToDelete));
  };

  const handleKeyPressMateria = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAgregarMateria();
    }
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Detalles Profesionales</h1>
        <p className="text-base text-gray-500">Añade tu experiencia y materias para destacar</p>
      </div>

      {/* Banner de Información Opcional */}
      <div className="rounded-lg p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: '#ebf8ff', border: '1px solid #bee2f7' }}>
        <FiInfo className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#475569' }} />
        <div>
          <h3 className="text-sm font-bold mb-1" style={{ color: '#475569' }}>Información Opcional</h3>
          <p className="text-sm" style={{ color: '#475569' }}>
            Estos campos son opcionales. Puedes completarlos ahora o editarlos más tarde desde tu perfil.
          </p>
        </div>
      </div>

      {/* Sección de Experiencia */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Experiencia</h2>
          {!showFormExperiencia && (
            <button
              onClick={() => setShowFormExperiencia(true)}
              className="px-4 py-2 text-sm font-semibold hover:text-primary/80 transition-colors"
              style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              + Añadir Experiencia
            </button>
          )}
        </div>

        {/* Formulario de Nueva Experiencia (Inline) */}
        {showFormExperiencia && (
          <FormNuevaExperienciaInline
            onSave={handleExperienciaGuardada}
            onCancel={() => setShowFormExperiencia(false)}
          />
        )}

        {/* Lista de Experiencias */}
        <div className="space-y-4">
          {experiencias.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg py-6 px-6 text-center bg-gray-50/30" style={{ borderColor: '#d1d5db' }}>
              <p className="text-sm text-gray-500 mb-3">No has agregado experiencia aún</p>
              <button
                onClick={() => setShowFormExperiencia(true)}
                className="px-4 py-2 text-sm font-semibold hover:text-primary/80 transition-colors"
                style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                + Añadir Experiencia
              </button>
            </div>
          ) : (
            experiencias.map((exp, index) => (
              <TarjetaExperiencia
                key={exp.id || index}
                experiencia={exp}
                onDelete={() => handleEliminarExperiencia(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Sección de Materias */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-6">Materias que Domino</h2>

        {/* Input y Botón de Agregar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Escribe una materia (Ej. Cálculo, Física...)"
            value={materiaInput}
            onChange={(e) => setMateriaInput(e.target.value)}
            onKeyPress={handleKeyPressMateria}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAgregarMateria}
            className="px-6 py-2 border-2 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'var(--primary)', cursor: 'pointer' }}
          >
            + Agregar
          </button>
        </div>

        {/* Etiquetas de Materias */}
        {materias.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {materias.map((materia) => (
              <div
                key={materia}
                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                style={{ backgroundColor: '#ebf8ff', border: '1px solid #bee2f7' }}
              >
                <span className="text-sm font-semibold text-gray-800">{materia}</span>
                <button
                  onClick={() => handleEliminarMateria(materia)}
                  className="text-gray-700 hover:text-gray-900 transition-colors font-bold"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: 0, lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
