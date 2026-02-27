'use client';

import { useState } from 'react';
import { InputField } from '@/components/shared/input-field/InputField';
import { Textarea } from '@/components/shared/textarea/Textarea';
import { FACULTADES_SEED } from '@/lib/seeds/facultades';
import { SEMESTRES_SEED } from '@/lib/seeds/semestres';

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
      <InputField
        id="nombreCompleto"
        label="Nombre Completo"
        name="nombreCompleto"
        pattern="letters-only"
        placeholder="Ej. Daniela Castro"
        value={formData.nombreCompleto}
        onChange={handleChange}
        maxLength={60}
        showCharCount
        helperText="Solo letras y espacios"
      />

      {/* Número de WhatsApp */}
      <InputField
        id="numeroWhatsapp"
        label="Número de WhatsApp"
        name="numeroWhatsapp"
        pattern="numbers-only"
        placeholder="Ej. 593991234567"
        value={formData.numeroWhatsapp}
        onChange={handleChange}
        helperText="Incluye el código del país (593 para Ecuador)"
      />

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
          {FACULTADES_SEED.map((facultad) => (
            <option key={facultad} value={facultad}>
              {facultad}
            </option>
          ))}
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
          {SEMESTRES_SEED.map((semestre) => (
            <option key={semestre} value={semestre}>
              {semestre}
            </option>
          ))}
        </select>
      </div>

      {/* Biografía Corta */}
      <Textarea
        id="biografiaCorta"
        label="Biografía Corta"
        name="biografiaCorta"
        placeholder="Cuéntales a los estudiantes sobre tu experiencia y método de enseñanza..."
        value={formData.biografiaCorta}
        onChange={handleChange}
        maxLength={300}
        showCharCount
        helperText="Describe tu experiencia, materias fuertes y estilo de enseñanza"
        rows={4}
      />

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
