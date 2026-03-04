'use client';

import React, { useState } from 'react';
import { formatDateInput } from '@/utils/clientDateValidation';

interface InputFechaExperienciaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldName: 'fechaInicio' | 'fechaFin';
  errorMessage?: string;
}

export function InputFechaExperiencia({
  label,
  placeholder,
  value,
  onChange,
  fieldName,
  errorMessage,
}: InputFechaExperienciaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Permitir la palabra "Presente" en fechaFin
    if (fieldName === 'fechaFin' && newValue.toLowerCase() === 'presente') {
      newValue = 'Presente';
    } else {
      // Formatear automáticamente a MM/AAAA
      newValue = formatDateInput(newValue, fieldName);
    }

    // Simular el evento con el valor formateado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // Permitir teclas de control
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key)) {
      return;
    }

    // CA3: Bloquear caracteres no-numéricos (excepto '/')
    if (!/^\d|\//.test(key)) {
      e.preventDefault();
      return;
    }

    // CA4: Prevenir si excede longitud máxima
    if (value.length >= 7) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={fieldName === 'fechaFin' && value.toLowerCase() === 'presente' ? 8 : 7}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
        }`}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
}
