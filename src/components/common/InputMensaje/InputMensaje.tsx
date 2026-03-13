'use client';

import clsx from 'clsx';

interface InputMensajeProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder: string;
  label: string;
  error?: string;
  name: string;
}

export default function InputMensaje({
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  error,
  name,
}: InputMensajeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-xs font-semibold text-gray-900">
        {label}
        {label.includes('*') && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={clsx(
          'w-full px-3 py-2 rounded-lg border-2 transition-colors duration-200 resize-none text-xs',
          error
            ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-red-500'
            : 'border-gray-300 bg-white focus:outline-none focus:border-blue-500'
        )}
        rows={3}
      />
      <div className="flex justify-between items-start">
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        <p className={clsx('text-xs font-medium ml-auto', error ? 'text-red-600' : 'text-gray-500')}>
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
