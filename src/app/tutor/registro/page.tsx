'use client';

import { montserrat, dancingScript } from '@/lib/fonts';
import { FormularioDatosBasicos } from '@/components/tutor/formulario-datos-basicos/FormularioDatosBasicos';
import { DefineHorarioPage } from '@/components/tutor/disponibilidad/DefineHorarioPage';
import { FormDetallesProfesionales } from '@/components/registro/form-detalles-profesionales/FormDetallesProfesionales';
import { completeRegistrationAction } from '@/actions/registro/completeRegistrationAction';
import { useRegistroStore } from '@/lib/stores/registroStore';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';
import { toast } from 'sonner';

export default function RegistrarTutorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isFinalizando, setIsFinalizando] = useState(false);
  const [experienciasStep3, setExperienciasStep3] = useState<Experiencia[]>([]);
  const [materiasStep3, setMateriasStep3] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Obtener datos del store (fotoPerfil viene del store, no necesita estado local duplicado)
  const { datosBasicos, disponibilidad, setFotoPerfil: storeFotoPerfil, fotoPerfil: fotoFromStore } = useRegistroStore();

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

  const handleFotoPerfilClick = () => {
    fileInputRef.current?.click();
  };

  const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida', {
        position: 'bottom-center',
      });
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB', {
        position: 'bottom-center',
      });
      return;
    }

    // Convertir a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      storeFotoPerfil(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFinalizarRegistro = async (experiencias: Experiencia[], materias: string[]) => {
    setIsFinalizando(true);
    try {
      // Llamar a la acción que SOLO finaliza con /perfil/finalizar (HU42)
      // Los endpoints HU34 y HU41 ya fueron llamados en sus pasos
      const result = await completeRegistrationAction({
        experiencias,
        materias,
      });

      // Si la acción no redirige (hay error), mostrar toast
      if (!result.success) {
        toast.error(result.message, {
          position: 'bottom-center',
          duration: 4000,
          unstyled: true,
          style: {
            backgroundColor: '#e53935',
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '16px 32px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        });
        setIsFinalizando(false);
      }
    } catch (error) {
      // NEXT_REDIRECT es una excepción especial de Next.js que se lanza cuando redirect() es exitoso
      // No es un error real, es parte del flujo normal de redirección
      const isNextRedirect = (error as Error & { digest?: string })?.digest?.includes('NEXT_REDIRECT');
      
      if (isNextRedirect) {
        // Si es un NEXT_REDIRECT, significa que el registro fue exitoso y la redirección está en proceso
        console.log('Redirecciones hacia dashboard/tutor...');
        return;
      }
      
      // Si es un error real, mostrar el toast
      console.error('Error finalizando registro:', error);
      toast.error('Error al completar el registro', {
        position: 'bottom-center',
        duration: 4000,
        unstyled: true,
        style: {
          backgroundColor: '#e53935',
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '16px 32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      });
      setIsFinalizando(false);
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

          {/* Page Header - Only shown on Step 1 */}
          {currentStep === 1 && (
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Completa tu Perfil
              </h1>
              <p className="text-gray-600 text-base">
                Cuéntanos sobre ti para que los estudiantes te conozcan
              </p>

              {/* Profile Photo Upload */}
              <div className="mt-8 mb-8 flex justify-center">
                <div className="relative w-32 h-32">
                  <button
                    onClick={handleFotoPerfilClick}
                    className="w-full h-full rounded-full border-2 border-dashed hover:bg-gray-50 transition-colors flex items-center justify-center overflow-hidden"
                    style={{ borderColor: '#d1d5db' }}
                  >
                    {fotoFromStore ? (
                      <img
                        src={fotoFromStore}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FiUser className="w-10 h-10 mx-auto mb-2" style={{ color: '#9ca3af' }} />
                        <p className="text-xs" style={{ color: '#6b7280' }}>
                          Subir Foto
                        </p>
                        <p className="text-xs" style={{ color: '#9ca3af' }}>
                          (Opcional)
                        </p>
                      </div>
                    )}
                  </button>
                  
                  {/* Icono de cámara superpuesto */}
                  {fotoFromStore && (
                    <button
                      onClick={handleFotoPerfilClick}
                      className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <FiCamera size={18} />
                    </button>
                  )}
                </div>

                {/* Input file oculto */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFotoPerfilChange}
                  className="hidden"
                />
              </div>
            </div>
          )}

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
            <FormDetallesProfesionales 
              onExperienciasChange={setExperienciasStep3}
              onMateriasChange={setMateriasStep3}
            />
          )}
          
          {/* Navigation Buttons - Only show on Step 3 */}
          {currentStep === 3 && (
            <div className="flex justify-between items-center mt-12 gap-6">
              {/* Back Button */}
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-3 px-6 py-3 font-semibold transition-colors rounded-lg"
                style={{
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <span>←</span>
                <div className="flex flex-col items-start">
                  <div className="font-bold">Atrás</div>
                  <div className="text-sm font-normal">Disponibilidad</div>
                </div>
              </button>

              {/* Finalizar Registro Button */}
              <button
                onClick={() => handleFinalizarRegistro(experienciasStep3, materiasStep3)}
                disabled={isFinalizando}
                className="px-8 py-3 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {isFinalizando ? 'Finalizando...' : 'Finalizar Registro'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
