import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware de autorización por roles.
 *
 * Lee el token JWT de la cookie `auth_token` y verifica:
 * 1. Si el usuario NO está autenticado → redirige a login (excepto rutas públicas)
 * 2. Si un ESTUDIANTE intenta acceder a rutas de TUTOR → redirige a /encuentra-tutoria
 * 3. Si un TUTOR intenta acceder a rutas de ESTUDIANTE → redirige a /dashboard/tutor
 */

// Rutas públicas (no requieren autenticación)
const PUBLIC_ROUTES = ['/', '/registro'];

// Rutas exclusivas de tutor
const TUTOR_ROUTES = ['/dashboard/tutor', '/bandeja'];

// Rutas exclusivas de estudiante
const STUDENT_ROUTES = ['/dashboard/solicitudes', '/encuentra-tutoria'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acceso a rutas públicas y assets
  if (
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/')) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Leer el token de la cookie
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    // No autenticado → redirigir a login
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Decodificar el JWT para obtener el rol (sin verificar firma aquí, 
  // ya que el backend valida la firma en cada request)
  try {
    const payload = decodeJwtPayload(token);
    const role = payload?.role as string | undefined;

    // Verificar acceso a rutas de tutor
    const isTutorRoute = TUTOR_ROUTES.some((r) => pathname.startsWith(r));
    if (isTutorRoute && role !== 'tutor') {
      const redirectUrl = new URL('/encuentra-tutoria', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar acceso a rutas de estudiante
    const isStudentRoute = STUDENT_ROUTES.some((r) => pathname.startsWith(r));
    if (isStudentRoute && role === 'tutor') {
      const redirectUrl = new URL('/dashboard/tutor', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch {
    // Token malformado → redirigir a login
    const loginUrl = new URL('/', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth_token');
    return response;
  }

  return NextResponse.next();
}

/**
 * Decodifica el payload del JWT sin verificar la firma.
 * La verificación de firma se hace en el backend en cada request.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
