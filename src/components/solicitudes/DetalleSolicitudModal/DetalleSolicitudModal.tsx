'use client';

import { useState, useEffect } from 'react';
import {
  FiAlertCircle,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMessageSquare,
  FiMonitor,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import { toast } from 'sonner';
import { SolicitudDetailDto, SolicitudStatus } from '@/dtos/solicitudes.dto';
import { getSolicitudDetailAction } from '@/actions/solicitudes/getSolicitudDetailAction';
import { cancelarSolicitudAction } from '@/actions/solicitudes/cancelarSolicitudAction';

interface DetalleSolicitudModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly solicitudId: string | null;
  /** Callback opcional ejecutado DESPUÉS de cancelar exitosamente */
  readonly onCancelSolicitud?: (solicitudId: string) => void;
}

export function DetalleSolicitudModal({
  isOpen,
  onClose,
  solicitudId,
  onCancelSolicitud,
}: DetalleSolicitudModalProps) {
  const [solicitudDetail, setSolicitudDetail] = useState<SolicitudDetailDto | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelClick = async () => {
    if (!solicitudId || isCancelling) return;
    setIsCancelling(true);
    try {
      const result = await cancelarSolicitudAction(solicitudId);
      if (result.success) {
        toast.success('Solicitud cancelada correctamente.');
        onCancelSolicitud?.(solicitudId);
        onClose();
      } else {
        toast.error(result.message || 'No se pudo cancelar la solicitud.');
      }
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !solicitudId) {
      setSolicitudDetail(null);
      setDetailError(null);
      return;
    }

    let isMounted = true;

    const loadDetail = async () => {
      setIsLoadingDetail(true);
      setDetailError(null);

      try {
        const detail = await getSolicitudDetailAction(solicitudId);

        if (!isMounted) return;

        if (!detail) {
          setSolicitudDetail(null);
          setDetailError('No se encontró el detalle de la solicitud.');
          return;
        }

        setSolicitudDetail(detail);
      } catch {
        if (isMounted) {
          setSolicitudDetail(null);
          setDetailError('No se pudo cargar el detalle de la solicitud.');
        }
      } finally {
        if (isMounted) setIsLoadingDetail(false);
      }
    };

    void loadDetail();

    return () => {
      isMounted = false;
    };
  }, [isOpen, solicitudId]);

  if (!isOpen) return null;

  // ── Helpers ────────────────────────────────────────────────────────────────

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('es-EC', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(iso));

  // ── Status badge ───────────────────────────────────────────────────────────

  const StatusBadge = ({ status }: { status: SolicitudStatus }) => {
    if (status === SolicitudStatus.PENDIENTE) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-orange-600">
          <FiAlertCircle size={11} />
          Pendiente
        </span>
      );
    }
    if (status === SolicitudStatus.EXPIRADA) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-500">
          <FiAlertCircle size={11} />
          Expirada
        </span>
      );
    }
    if (status === SolicitudStatus.ACEPTADA) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-600">
          <FiAlertCircle size={11} />
          Aceptada
        </span>
      );
    }
    return null;
  };

  // ── Body content ───────────────────────────────────────────────────────────

  let bodyContent: React.ReactNode;

  if (isLoadingDetail) {
    bodyContent = (
      <div className="py-10 text-center text-sm text-slate-500">
        Cargando detalle de solicitud…
      </div>
    );
  } else if (detailError) {
    bodyContent = (
      <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-center text-sm text-red-600">
        {detailError}
      </div>
    );
  } else if (solicitudDetail) {
    const isVirtual = solicitudDetail.modality?.toLowerCase() === 'virtual';
    const ModalityIcon = isVirtual ? FiMonitor : FiMapPin;

    bodyContent = (
      <div className="mt-4 space-y-3">

        {/* ── Tutor card ── */}
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#edf2f7] px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={solicitudDetail.avatarUrl || 'https://i.pravatar.cc/96'}
              alt={`Avatar de ${solicitudDetail.tutorName}`}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold leading-tight text-primary">
                {solicitudDetail.tutorName}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Tutor</p>
            </div>
          </div>
          <StatusBadge status={solicitudDetail.status} />
        </div>

        {/* ── Info card ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">

          {/* Materia */}
          <div className="flex items-center gap-2">
            <FiBookOpen size={16} className="text-yellow flex-shrink-0" />
            <p className="text-sm font-semibold text-primary">{solicitudDetail.subject}</p>
          </div>

          {/* Fecha + Hora */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiCalendar size={14} className="flex-shrink-0 text-slate-400" />
              <span className="capitalize">{formatDate(solicitudDetail.dateTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiClock size={14} className="flex-shrink-0 text-slate-400" />
              <span>{formatTime(solicitudDetail.dateTime)}</span>
            </div>
          </div>

          {/* Modalidad + Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ModalityIcon size={14} className="flex-shrink-0 text-slate-400" />
              <span>{solicitudDetail.modality}</span>
            </div>
            <span className="text-sm font-bold text-primary">
              ${solicitudDetail.price}/h
            </span>
          </div>
        </div>

        {/* Mensaje — franja amarilla izquierda como en el prototipo */}
        <div className="rounded-xl border border-slate-200 bg-[#f9fbff] p-4 border-l-4 border-l-yellow">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-primary">
            <FiMessageSquare size={13} />
            <span>Tu mensaje</span>
          </div>
          <p className="mt-2 text-sm italic text-slate-600">
            &ldquo;{solicitudDetail.studentMessage}&rdquo;
          </p>
        </div>
      </div>
    );
  } else {
    bodyContent = (
      <div className="py-8 text-center text-sm text-slate-500">
        No hay datos para mostrar.
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const isPendiente = solicitudDetail?.status === SolicitudStatus.PENDIENTE;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/40 px-4"
      aria-label="Detalle de la Solicitud"
    >
      {/* Panel */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-primary">Detalle de la Solicitud</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
          >
            <FiX size={18} />
          </button>
        </header>

        {/* Body */}
        <div className="px-5 pb-4">
          {bodyContent}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </dialog>
  );
}