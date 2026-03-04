'use client';

import { useState } from 'react';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { ModalNuevaExperiencia } from '@/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia';
import { TarjetaExperiencia } from '@/components/registro/tarjeta-experiencia/TarjetaExperiencia';

export function FormDetallesProfesionales() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [materias, setMaterias] = useState<string[]>([]);
  const [materiaInput, setMateriaInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExperienciaGuardada = (experiencia: Experiencia) => {
    setExperiencias([...experiencias, experiencia]);
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

  return (
    <div className="space-y-8">
      {/* Sección de Experiencia */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Experiencia</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            + Añadir Experiencia
          </button>
        </div>

        {/* Lista de Experiencias */}
        <div className="space-y-4">
          {experiencias.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay experiencias añadidas aún</p>
          ) : (
            experiencias.map((exp, index) => (
              <TarjetaExperiencia
                key={index}
                experiencia={exp}
                onDelete={() => handleEliminarExperiencia(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Sección de Materias */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Materias que Domino</h2>

        {/* Input y Botón de Agregar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Escribe una materia (Ej. Cálculo, Física...)"
            value={materiaInput}
            onChange={(e) => setMateriaInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAgregarMateria}
            className="px-6 py-2 border border-gray-800 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            style={{ cursor: 'pointer' }}
          >
            + Agregar
          </button>
        </div>

        {/* Etiquetas de Materias */}
        <div className="flex flex-wrap gap-3">
          {materias.map((materia) => (
            <div
              key={materia}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: '#ADD5F7' }}
            >
              <span className="text-sm font-semibold text-blue-900">{materia}</span>
              <button
                onClick={() => handleEliminarMateria(materia)}
                className="text-blue-900 hover:text-blue-700 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: 0 }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Nueva Experiencia */}
      <ModalNuevaExperiencia
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleExperienciaGuardada}
      />
    </div>
  );
}
