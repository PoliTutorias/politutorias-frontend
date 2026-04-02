'use client';

import clsx from 'clsx';

interface ComentarioTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  placeholder: string;
  id?: string;
  name?: string;
  readOnly?: boolean;
  className?: string;
}

export function ComentarioTextArea({
  value,
  onChange,
  maxLength,
  placeholder,
  id,
  name,
  readOnly = false,
  className,
}: ComentarioTextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e);
    }
  };

  const currentLength = value.length;
  const isAtLimit = currentLength === maxLength;

  return (
    <div className={className}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
          readOnly
            ? 'border-gray-200 bg-gray-50 text-gray-700'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          'resize-none',
        )}
        rows={4}
      />
      <div className="mt-1 flex justify-end text-xs text-gray-500">
        <span className={clsx(isAtLimit && 'text-gray-700 font-semibold')}>
          {currentLength}/{maxLength}
        </span>
      </div>
    </div>
  );
}
