'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { montserrat, dancingScript } from '@/lib/fonts';
import { HorarioGrid } from '@/components/tutor/HorarioGrid/HorarioGrid';
import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';
import { getDisponibilidadAction } from '@/actions/tutor/getDisponibilidadAction';
import { toast } from 'sonner';
import { FiArrowLeft } from 'react-icons/fi';

export default function GestionarDisponibilidadPage() {
    const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar disponibilidad actual del tutor
    useEffect(() => {
        const loadAvailability = async () => {
            try {
                const result = await getDisponibilidadAction();
                if ('error' in result) {
                    toast.error(result.error);
                    setBlocks([]);
                } else {
                    setBlocks(result.blocks);
                }
            } catch (error) {
                console.error('Error loading availability:', error);
                toast.error('Error al cargar la disponibilidad');
            } finally {
                setIsLoading(false);
            }
        };

        loadAvailability();
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f7fafc' }}>
            {/* Header */}
            <header
                className="text-white px-6 py-4"
                style={{ backgroundColor: 'var(--primary)' }}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/dashboard/tutor"
                        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                    >
                        <FiArrowLeft size={18} />
                        <span className="font-semibold text-sm">Volver al Panel</span>
                    </Link>
                    <Link href="/" className="flex items-center">
                        <span
                            className={`${montserrat.className} antialiased font-extrabold text-white text-2xl`}
                        >
                            Poli
                        </span>
                        <span
                            className={`${dancingScript.className} antialiased text-lg`}
                            style={{ color: 'var(--yellow)' }}
                        >
                            Tutorías
                        </span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    {/* Title */}
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{ color: 'var(--foreground)' }}
                    >
                        Gestionar Disponibilidad
                    </h1>
                    <p className="text-gray-600 text-sm mb-1">
                        Haz clic en los horarios que tienes disponibles para ofrecer
                        tutorías.
                    </p>
                    <p className="text-gray-400 text-xs mb-4">
                        Tu horario se mostrará en la zona horaria local (GMT-5).
                    </p>

                    {/* Counter */}
                    {blocks.length > 0 && (
                        <p className="text-green-600 font-medium text-sm mb-6">
                            ✓ {blocks.length} horario{blocks.length !== 1 ? 's' : ''}{' '}
                            seleccionado{blocks.length !== 1 ? 's' : ''}
                        </p>
                    )}

                    {/* Loading state */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div
                                    className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4"
                                    style={{ borderTopColor: 'var(--primary)' }}
                                />
                                <p className="text-gray-500 text-sm">
                                    Cargando disponibilidad...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Grid - Read Only */}
                            <div className="mb-8">
                                <HorarioGrid
                                    selectedBlocks={blocks}
                                    readOnly={true}
                                />
                            </div>

                            {/* Action Buttons - Visible but disabled (read-only view) */}
                            <div className="flex justify-end items-center gap-4">
                                <button
                                    disabled={true}
                                    className="px-6 py-2.5 font-semibold text-sm rounded-lg transition-all opacity-40 cursor-not-allowed"
                                    style={{
                                        color: '#4a5568',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={true}
                                    className="px-6 py-2.5 text-white font-semibold text-sm rounded-lg transition-all opacity-40 cursor-not-allowed"
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                    }}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
