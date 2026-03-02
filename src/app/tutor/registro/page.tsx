'use client';

import { montserrat, dancingScript } from '@/lib/fonts';
import { FormularioDatosBasicos } from '@/components/tutor/formulario-datos-basicos/FormularioDatosBasicos';
import { DefineHorarioPage } from '@/components/tutor/disponibilidad/DefineHorarioPage';
import Link from 'next/link';
import { useState } from 'react';
import { FiUser, FiCheckCircle } from 'react-icons/fi';

export default function RegistrarTutorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { number: 1, label: 'Datos Básicos' },
    { number: 2, label: 'Disponibilidad' },
    { number: 3, label: 'Perfil Profesional' },
  ];

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
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
                  disabled={step.number > currentStep}
                  className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all text-white"
                  style={{
                    backgroundColor: step.number === currentStep
                      ? 'var(--primary)'
                      : '#d1d5db',
                    color: step.number === currentStep ? 'white' : '#4b5563',
                    cursor: step.number > currentStep ? 'not-allowed' : 'pointer',
                  }}
                >
                  {step.number}
                </button>
                <button
                  onClick={() => handleStepClick(step.number)}
                  disabled={step.number > currentStep}
                  className={`ml-3 font-semibold transition-all text-base ${step.number === currentStep ? '' : 'text-sm text-gray-500'}`}
                  style={{
                    color: step.number === currentStep ? 'var(--primary)' : '#6b7280',
                    cursor: step.number > currentStep ? 'not-allowed' : 'pointer',
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

          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Completa tu Perfil
            </h1>
            <p className="text-gray-600 text-base">
              Cuéntanos sobre ti para que los estudiantes te conozcan
            </p>

            {/* Profile Photo Upload */}
            <div className="mt-8 mb-8 flex justify-center">
              <button className="w-32 h-32 rounded-full border-2 border-dashed hover:bg-gray-50 transition-colors flex items-center justify-center group" style={{ borderColor: '#d1d5db' }}>
                <div className="text-center">
                  <FiUser className="w-10 h-10 mx-auto mb-2" style={{ color: '#9ca3af' }} />
                  <p className="text-xs" style={{ color: '#6b7280' }}>
                    Subir Foto
                  </p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>
                    (Opcional)
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          {currentStep === 1 && (
            <FormularioDatosBasicos
              onStepComplete={() => setCurrentStep(2)}
              savedData={formData}
              onSaveData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <DefineHorarioPage
              onStepComplete={() => setCurrentStep(3)}
              onPreviousStep={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <div className="text-center py-12 text-gray-500">
              Sección 3 - Perfil Profesional (Por implementar)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
