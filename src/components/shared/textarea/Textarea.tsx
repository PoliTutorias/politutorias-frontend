'use client';

import React, { TextareaHTMLAttributes, useState } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  showCharCount?: boolean;
  error?: string;
  helperText?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      placeholder,
      maxLength,
      showCharCount = false,
      error,
      helperText,
      className = '',
      value: initialValue = '',
      onChange,
      onPaste,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState<string | number | readonly string[]>(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      // Limitar a maxLength
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      setValue(newValue);
      e.target.value = newValue;
      onChange?.(e);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const currentValue = (e.target as HTMLTextAreaElement).value;

      let newValue = currentValue + pastedText;

      // Limitar a maxLength
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      setValue(newValue);

      // Trigger onChange event
      const textareaElement = e.target as HTMLTextAreaElement;
      const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;

      if (nativeTextareaValueSetter) {
        nativeTextareaValueSetter.call(textareaElement, newValue);
      }

      const event = new Event('change', { bubbles: true });
      textareaElement.dispatchEvent(event);
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
        <textarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors ${error
              ? 'border-[var(--error)] focus:ring-[var(--error)]'
              : 'border-gray-300 focus:ring-[var(--primary)]'
            } ${className}`}
          {...rest}
        />

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

Textarea.displayName = 'Textarea';
