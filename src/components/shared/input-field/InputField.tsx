'use client';

import React, { InputHTMLAttributes, useState } from 'react';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'> {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  showCharCount?: boolean;
  error?: string;
  helperText?: string;
  pattern?: 'letters-only' | 'numbers-only' | 'email' | 'tel' | 'text';
  ref?: React.Ref<HTMLInputElement>;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      maxLength,
      showCharCount = false,
      error,
      helperText,
      pattern = 'text',
      className = '',
      value: initialValue = '',
      onChange,
      onKeyPress,
      onPaste,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState<string | number | readonly string[]>(initialValue);

    const validateInput = (inputValue: string): boolean => {
      switch (pattern) {
        case 'letters-only':
          // Solo letras y espacios
          return /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]*$/.test(inputValue);
        case 'numbers-only':
          // Solo números
          return /^\d*$/.test(inputValue);
        case 'email':
          return true; // El navegador valida emails nativamente
        case 'tel':
          return /^\d*$/.test(inputValue);
        default:
          return true;
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputChar = String.fromCharCode(e.which);

      // Validar el carácter antes de permitir su entrada
      const currentValue = (e.target as HTMLInputElement).value;
      const newValue = currentValue + inputChar;

      if (maxLength && newValue.length > maxLength) {
        e.preventDefault();
        return;
      }

      if (!validateInput(newValue)) {
        e.preventDefault();
      }

      onKeyPress?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Validar el valor completo
      if (!validateInput(newValue)) {
        // Si no es válido, remover el último carácter
        newValue = newValue.slice(0, -1);
      }

      // Limitar a maxLength
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      setValue(newValue);
      e.target.value = newValue;
      onChange?.(e);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const currentValue = (e.target as HTMLInputElement).value;

      // Validar el texto pegado
      if (!validateInput(pastedText)) {
        return;
      }

      let newValue = currentValue + pastedText;

      // Limitar a maxLength
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      setValue(newValue);

      // Trigger onChange event
      const inputElement = e.target as HTMLInputElement;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, newValue);
      }

      const event = new Event('change', { bubbles: true });
      inputElement.dispatchEvent(event);
    };

    const charCount = String(value).length;
    const isOverLimit = maxLength && charCount > maxLength;

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
        <div className="relative">
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error
                ? 'border-[var(--error)] focus:ring-[var(--error)]'
                : 'border-gray-300 focus:ring-[var(--primary)]'
              } ${className}`}
            {...rest}
          />
        </div>

        <div className="flex justify-between items-start mt-1">
          {error ? (
            <p className="text-sm text-[var(--error)]">{error}</p>
          ) : (
            helperText && <p className="text-xs text-gray-500">{helperText}</p>
          )}
          {showCharCount && maxLength && (
            <p
              className={`text-xs font-medium ${isOverLimit ? 'text-[var(--error)]' : 'text-gray-500'
                }`}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
