'use client';

/**
 * Error Boundary global de la aplicación.
 * Captura errores de Server Components y muestra un fallback amigable.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7fafc] px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Algo salió mal
                </h2>
                <p className="text-gray-600 mb-6">
                    Ocurrió un error inesperado. Por favor, intenta nuevamente.
                </p>
                {error.digest && (
                    <p className="text-xs text-gray-400 mb-4">
                        Código de error: {error.digest}
                    </p>
                )}
                <button
                    onClick={reset}
                    className="px-6 py-2.5 text-white font-semibold rounded-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--primary, #1a237e)' }}
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    );
}
