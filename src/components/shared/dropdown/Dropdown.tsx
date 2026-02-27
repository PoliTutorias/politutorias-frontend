'use client';

import React, { SelectHTMLAttributes } from 'react';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  defaultText?: string;
  error?: string;
  helperText?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      label,
      options,
      defaultText = 'Selecciona una opción',
      error,
      helperText,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={rest.id}
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none bg-white cursor-pointer ${error
              ? 'border-[var(--error)] focus:ring-[var(--error)]'
              : 'border-gray-300 focus:ring-[var(--primary)]'
            } ${className}`}
          {...rest}
        >
          <option value="">{defaultText}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="mt-1">
          {error ? (
            <p className="text-sm text-[var(--error)]">{error}</p>
          ) : (
            helperText && <p className="text-xs text-gray-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
