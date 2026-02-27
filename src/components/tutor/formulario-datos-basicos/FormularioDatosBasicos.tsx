'use client';

import { useState } from 'react';
import { InputField } from '@/components/shared/input-field/InputField';
import { Textarea } from '@/components/shared/textarea/Textarea';
import { Dropdown } from '@/components/shared/dropdown/Dropdown';
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
      <Dropdown
        id="facultad"
        name="facultad"
        label="Facultad"
        options={Array.from(FACULTADES_SEED)}
        defaultText="Selecciona tu facultad"
        value={formData.facultad}
        onChange={handleChange}
      />

      {/* Semestre Actual */}
      <Dropdown
        id="semestreActual"
        name="semestreActual"
        label="Semestre Actual"
        options={Array.from(SEMESTRES_SEED)}
        defaultText="Selecciona"
        value={formData.semestreActual}
        onChange={handleChange}
      />

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
