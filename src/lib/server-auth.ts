'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Guarda el token JWT en una cookie HttpOnly del servidor.
 * Llamar desde loginAction/registerAction después de un login exitoso.
 */
export async function setServerToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

/**
 * Obtiene el token JWT desde la cookie del servidor.
 * Usado por las server actions que necesitan autenticarse con el backend.
 *
 * Fallback to TEMPORARY_TOKEN env var for backward compatibility.
 */
export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (cookie?.value) {
    return cookie.value;
  }

  // Fallback legacy
  return process.env.TEMPORARY_TOKEN ?? null;
}

/**
 * Elimina la cookie de autenticación del servidor.
 * Llamar cuando el usuario hace logout.
 */
export async function clearServerToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Obtiene la configuración de request con token y baseUrl.
 * Reemplaza el patrón `getRequestConfig()` que usaba TEMPORARY_TOKEN.
 */
export async function getRequestConfig(): Promise<{ baseUrl: string; token: string }> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await getServerToken();

  if (!backendUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurado.');
  }

  if (!token) {
    // Durante SSR/pre-render, la cookie puede no estar disponible.
    // El caller debe manejar respuestas vacías con gracia.
    console.warn('[server-auth] Token no disponible — sesión no iniciada o cookie caducada.');
    return { baseUrl: backendUrl.replace(/\/+$/, ''), token: '' };
  }

  return {
    baseUrl: backendUrl.replace(/\/+$/, ''),
    token,
  };
}
