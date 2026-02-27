import { montserrat, dancingScript } from '@/lib/fonts';
import Link from 'next/link';

export default function DisponibilidadPage() {
  const steps = [
    { number: 1, label: 'Datos Básicos' },
    { number: 2, label: 'Disponibilidad' },
    { number: 3, label: 'Perfil Profesional' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar */}
      <nav className="bg-[var(--primary)] text-white px-6 py-4">
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <span className={`${montserrat.className} antialiased font-extrabold text-white text-3xl`}>
              Poli
            </span>
            <span className={`${dancingScript.className} antialiased text-[var(--yellow)] text-lg`}>
              Tutorías
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Wizard Steps */}
        <div className="flex justify-center items-center gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg transition-colors ${step.number === 2
                    ? 'bg-[var(--primary)] text-white'
                    : step.number < 2
                      ? 'bg-[var(--success)] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {step.number < 2 ? '✓' : step.number}
              </div>
              <span
                className={`ml-3 text-sm font-medium ${step.number === 2
                    ? 'text-[var(--primary)]'
                    : step.number < 2
                      ? 'text-[var(--success)]'
                      : 'text-gray-500'
                  }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`ml-8 w-16 h-1 ${step.number < 2 ? 'bg-[var(--success)]' : 'bg-gray-200'
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Define tu Horario
          </h1>
          <p className="text-gray-600">
            Selecciona los bloques horarios en los que puedes dar clases
          </p>
        </div>

        {/* Content Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <p className="text-center text-gray-600">
            Esta sección se completará en futuras iteraciones del proyecto
          </p>
        </div>
      </div>
    </div>
  );
}
