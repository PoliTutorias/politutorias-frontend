'use client';

interface MensajeErrorFechaProps {
  message: string | undefined;
}

export function MensajeErrorFecha({ message }: MensajeErrorFechaProps) {
  if (!message) return null;

  return (
    <span className="text-red-500 text-xs mt-1 block">
      {message}
    </span>
  );
}
