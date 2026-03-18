'use server';

import { setServerToken, clearServerToken } from '@/lib/server-auth';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isTutor: boolean;
  tutorId?: string;
}

interface AuthResult {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
}

export async function loginAction(params: LoginParams): Promise<AuthResult> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      return { success: false, error: 'API no configurada.' };
    }

    const response = await fetch(`${apiBaseUrl}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || 'Credenciales inválidas.',
      };
    }

    const data = await response.json();

    // Guardar token en cookie HttpOnly para server actions
    if (data.token) {
      await setServerToken(data.token);
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch {
    return { success: false, error: 'Error de conexión con el servidor.' };
  }
}

export async function registerAction(params: RegisterParams): Promise<AuthResult> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      return { success: false, error: 'API no configurada.' };
    }

    const response = await fetch(`${apiBaseUrl}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || 'Error al registrar.',
      };
    }

    const data = await response.json();

    // Guardar token en cookie HttpOnly para server actions
    if (data.token) {
      await setServerToken(data.token);
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch {
    return { success: false, error: 'Error de conexión con el servidor.' };
  }
}

export async function getMeAction(token: string): Promise<AuthResult> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      return { success: false, error: 'API no configurada.' };
    }

    const response = await fetch(`${apiBaseUrl}auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Sesión expirada.' };
    }

    const user = await response.json();
    return {
      success: true,
      user,
    };
  } catch {
    return { success: false, error: 'Error de conexión con el servidor.' };
  }
}

/**
 * Server action para limpiar la cookie de autenticación al hacer logout.
 */
export async function logoutAction(): Promise<void> {
  await clearServerToken();
}
