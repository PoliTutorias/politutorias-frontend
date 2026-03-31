'use client';

import { AlertTriangle, X, XCircle } from 'lucide-react';

interface ConfirmModalProps {
  readonly isOpen: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly cancelLabel: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      open
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
      className="fixed inset-0 z-[60] m-0 flex h-screen w-screen items-center justify-center bg-[rgba(15,23,42,0.36)] px-4"
    >
      <div className="w-full max-w-[460px] rounded-2xl bg-white px-6 pb-5 pt-4 shadow-[0_18px_60px_rgba(15,23,42,0.24)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1f2b3d]">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar modal"
            className="rounded p-1 text-[#5f6f83] transition-colors hover:bg-[#eef3f8]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6 flex gap-3">
          <span className="mt-0.5 shrink-0 text-[#e53935]">
            <AlertTriangle size={22} />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-[#1f2b3d]">¿Estás seguro?</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#5f738f]">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-2 py-1 text-[15px] font-semibold text-[#4f637f] transition-colors hover:text-[#1f2b3d] disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e53935] px-4 py-2 text-[14px] font-medium text-[#e53935] transition-colors hover:bg-[#fef2f2] disabled:opacity-50"
          >
            <XCircle size={15} />
            {isLoading ? 'Reportando...' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
