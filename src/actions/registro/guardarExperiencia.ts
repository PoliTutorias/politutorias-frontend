'use server';

import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

export async function actionGuardarExperiencia(experienciaData: Experiencia): Promise<Experiencia> {
  // Simular un retardo de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simular guardado exitoso retornando la experiencia con ID
  const experienciaGuardada: Experiencia = {
    ...experienciaData,
    id: `exp-${Date.now()}`,
  };

  // BLOQUE COMENTADO: Código de integración con backend
  /*
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/experiencias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienciaData),
    });

    if (!response.ok) {
      throw new Error(`Error al guardar experiencia: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error guardando experiencia:', error);
    throw error;
  }
  */

  return experienciaGuardada;
}
