'use client';

import { useState } from 'react';

export function FormularioDatosBasicos() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroWhatsapp: '',
    facultad: '',
    semestreActual: '',
    biografiaCorta: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validaciones y envío de datos
    console.log('Form submitted:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto space-y-6"
    >
      {/* Nombre Completo */}
      <div>
        <label htmlFor="nombreCompleto" className="block text-sm font-semibold text-gray-700 mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombreCompleto"
          placeholder="Ej. Daniela Castro"
          value={formData.nombreCompleto}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <p className="text-xs text-gray-500 mt-1">Solo letras y espacios</p>
      </div>

      {/* Número de WhatsApp */}
      <div>
        <label htmlFor="numeroWhatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
          Número de WhatsApp
        </label>
        <input
          type="tel"
          id="numeroWhatsapp"
          name="numeroWhatsapp"
          placeholder="Ej. 593991234567"
          value={formData.numeroWhatsapp}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <p className="text-xs text-gray-500 mt-1">Incluye el código del país (593 para Ecuador)</p>
      </div>

      {/* Facultad */}
      <div>
        <label htmlFor="facultad" className="block text-sm font-semibold text-gray-700 mb-2">
          Facultad
        </label>
        <select
          id="facultad"
          name="facultad"
          value={formData.facultad}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Selecciona tu facultad</option>
        </select>
      </div>

      {/* Semestre Actual */}
      <div>
        <label htmlFor="semestreActual" className="block text-sm font-semibold text-gray-700 mb-2">
          Semestre Actual
        </label>
        <select
          id="semestreActual"
          name="semestreActual"
          value={formData.semestreActual}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Selecciona</option>
        </select>
      </div>

      {/* Biografía Corta */}
      <div>
        <label htmlFor="biografiaCorta" className="block text-sm font-semibold text-gray-700 mb-2">
          Biografía Corta
        </label>
        <textarea
          id="biografiaCorta"
          name="biografiaCorta"
          placeholder="Cuéntales a los estudiantes sobre tu experiencia y método de enseñanza..."
          value={formData.biografiaCorta}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">Describe tu experiencia, materias fuertes y estilo de enseñanza</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[var(--primary)] text-white font-semibold py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
      >
        Siguiente Disponibilidad →
      </button>
    </form>
  );
}
