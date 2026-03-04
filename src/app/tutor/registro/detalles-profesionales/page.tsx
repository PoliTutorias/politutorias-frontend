'use client';

import { montserrat, dancingScript } from '@/lib/fonts';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { FormDetallesProfesionales } from '@/components/registro/form-detalles-profesionales/FormDetallesProfesionales';

export default function DetallesProfesionalesPage() {
  const router = useRouter();

  const steps = [
    { number: 1, label: 'Datos Básicos' },
    { number: 2, label: 'Disponibilidad' },
    { number: 3, label: 'Detalles Profesionales' },
  ];

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < 3) {
      router.push(`/tutor/registro/${stepNumber === 1 ? 'datos-basicos' : 'disponibilidad'}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navbar */}
      <nav className="text-white px-6 py-4" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <span className={`${montserrat.className} antialiased font-extrabold text-white text-3xl`}>
              Poli
            </span>
            <span className={`${dancingScript.className} antialiased text-lg`} style={{ color: 'var(--yellow)' }}>
              Tutorías
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Card Wrapper */}
        <div className="bg-white rounded-lg shadow-lg p-10">
          {/* Wizard Steps */}
          <div className="flex justify-center items-center gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.number)}
                  disabled={step.number > 3}
                  className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all text-white"
                  style={{
                    backgroundColor: step.number === 3
                      ? 'var(--primary)'
                      : '#d1d5db',
                    color: step.number === 3 ? 'white' : '#4b5563',
                    cursor: step.number > 3 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {step.number}
                </button>
                <button
                  onClick={() => handleStepClick(step.number)}
                  disabled={step.number > 3}
                  className={`ml-3 font-semibold transition-all text-base ${step.number === 3 ? '' : 'text-sm text-gray-500'}`}
                  style={{
                    color: step.number === 3 ? 'var(--primary)' : '#6b7280',
                    cursor: step.number > 3 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                >
                  {step.label}
                </button>
                {index < steps.length - 1 && (
                  <div className="ml-6 w-12 h-px" style={{ backgroundColor: '#d1d5db' }}></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Container */}
          <FormDetallesProfesionales />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={() => router.push('/tutor/registro/disponibilidad')}
              className="flex items-center gap-2 px-6 py-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Atrás</span>
              <span className="text-sm text-gray-500">Disponibilidad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
