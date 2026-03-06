'use client';

import React from 'react';

interface InputExperienciaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputExperiencia({
  label,
  placeholder,
  value,
  onChange,
}: InputExperienciaProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
