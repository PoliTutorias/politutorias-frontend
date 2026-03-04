'use server';

import { redirect } from 'next/navigation';
import { PerfilProfesional } from '@/interfaces/perfil-profesional-tipo/PerfilProfesional';
import { perfilProfesionalSeedData } from '@/seed/PerfilProfesionalSeedData';

export async function actionFinalizarRegistro(perfilData: PerfilProfesional): Promise<void> {
  // Simular un retardo de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // BLOQUE COMENTADO: Código de integración con backend
  /*
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/perfil/finalizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perfilData),
    });

    if (!response.ok) {
      throw new Error(`Error al finalizar registro: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Perfil finalizado:', data);
  } catch (error) {
    console.error('Error finalizando perfil:', error);
    throw error;
  }
  */

  // CA6: Redirigir a la pantalla de éxito
  redirect('/registro-exitoso');
}
