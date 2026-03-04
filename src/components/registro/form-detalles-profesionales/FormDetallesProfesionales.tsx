'use client';

import { useState } from 'react';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

export function FormDetallesProfesionales() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [materias, setMaterias] = useState<string[]>([]);
  const [materiaInput, setMateriaInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExperienciaGuardada = (experiencia: Experiencia) => {
    setExperiencias([...experiencias, experiencia]);
    setIsModalOpen(false);
  };

  const handleEliminarExperiencia = (indexToDelete: number) => {
    setExperiencias(experiencias.filter((_, index) => index !== indexToDelete));
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
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.puesto}</h3>
                  <p className="text-sm text-gray-600">{exp.institucion}</p>
                  <p className="text-xs text-gray-500">{exp.fechaInicio} — {exp.fechaFin}</p>
                </div>
                <button
                  onClick={() => handleEliminarExperiencia(index)}
                  className="text-red-500 hover:text-red-700 transition-colors font-bold text-lg"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
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
            onClick={() => {
              if (materiaInput.trim() && !materias.includes(materiaInput.trim())) {
                setMaterias([...materias, materiaInput.trim()]);
                setMateriaInput('');
              }
            }}
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
                onClick={() => setMaterias(materias.filter((m) => m !== materia))}
                className="text-blue-900 hover:text-blue-700 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: 0 }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Nueva Experiencia</h3>
            <p className="text-gray-600 text-sm mb-4">Modal de experiencia (será implementado en Tarea 5)</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
