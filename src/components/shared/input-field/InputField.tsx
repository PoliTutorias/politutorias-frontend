'use client';

import React, { InputHTMLAttributes, useCallback } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength'> {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  showCharCount?: boolean;
  error?: string;
  helperText?: string;
  success?: boolean;
  successMessage?: string;
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
      success = false,
      successMessage,
      pattern = 'text',
      className = '',
      onChange,
      onKeyPress,
      onPaste,
      value,
      ...rest
    },
    ref
  ) => {
    const validateInput = useCallback((inputValue: string): boolean => {
      switch (pattern) {
        case 'letters-only':
          return /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]*$/.test(inputValue);
        case 'numbers-only':
          return /^\d*$/.test(inputValue);
        case 'email':
          return true;
        case 'tel':
          return /^\d*$/.test(inputValue);
        default:
          return true;
      }
    }, [pattern]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputChar = String.fromCharCode(e.which);
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
    }, [maxLength, validateInput, onKeyPress]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Validar el valor completo
      if (!validateInput(newValue)) {
        // Si no es válido, remover caracteres inválidos
        newValue = newValue.slice(0, -1);
        e.target.value = newValue;
      }

      // Limitar a maxLength
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
        e.target.value = newValue;
      }

      // Propagar al handler de react-hook-form
      onChange?.(e);
    }, [maxLength, validateInput, onChange]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');

      if (!validateInput(pastedText)) {
        return;
      }

      const inputElement = e.target as HTMLInputElement;
      const currentValue = inputElement.value;
      let newValue = currentValue + pastedText;

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      // Usar nativeInputValueSetter para que react-hook-form detecte el cambio
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, newValue);
      }

      const event = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(event);
    }, [maxLength, validateInput]);

    // Para el char count, usamos el valor del DOM leído via value prop (react-hook-form watch)
    const displayValue = value ?? '';
    const charCount = String(displayValue).length;
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
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${className}`}
            style={{
              borderColor: success
                ? 'var(--success)'
                : error
                  ? 'var(--error)'
                  : '#d1d5db',
              '--tw-ring-color': success
                ? 'var(--success)'
                : error
                  ? 'var(--error)'
                  : 'var(--primary)',
            } as React.CSSProperties}
            {...rest}
          />
        </div>

        <div className="flex justify-between items-start mt-1">
          {success && successMessage ? (
            <p className="text-sm flex items-center gap-1" style={{ color: 'var(--success)' }}>
              <FiCheckCircle className="w-4 h-4" />
              {successMessage}
            </p>
          ) : error ? (
            <p className="text-sm" style={{ color: 'var(--error)' }}>
              {error}
            </p>
          ) : (
            helperText && <p className="text-xs text-gray-500">{helperText}</p>
          )}
          {showCharCount && maxLength && (
            <p
              className="text-xs font-medium"
              style={{ color: isOverLimit ? 'var(--error)' : '#6b7280' }}
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
