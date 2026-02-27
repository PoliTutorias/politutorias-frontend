import { montserrat, dancingScript } from '@/lib/fonts';
import { FormularioDatosBasicos } from '@/components/tutor/formulario-datos-basicos/FormularioDatosBasicos';
import Link from 'next/link';

export default function RegistrarTutorPage() {
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
                className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg transition-colors ${
                  step.number === 1
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`ml-3 text-sm font-medium ${
                  step.number === 1 ? 'text-[var(--primary)]' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="ml-8 w-16 h-1 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Completa tu Perfil
          </h1>
          <p className="text-gray-600">
            Cuéntanos sobre ti para que los estudiantes te conozcan
          </p>
        </div>

        {/* Form */}
        <FormularioDatosBasicos />
      </div>
    </div>
  );
}
