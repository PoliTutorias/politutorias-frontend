/**
 * Helper para obtener el token de autenticación.
 *
 * En el frontend (client components), el token viene del Zustand authStore.
 * En los server actions, se pasa como parámetro desde el client.
 *
 * Este módulo provee la función getAuthToken() que puede ser llamada
 * desde server actions recibiendo el token como parámetro.
 */

/**
 * Construye los headers de autorización para requests al backend.
 */
export function buildAuthHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
}
