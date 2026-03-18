'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { montserrat, dancingScript } from '@/lib/fonts';
import { loginAction } from '@/actions/auth/authActions';
import { useAuthStore } from '@/lib/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Completa todos los campos.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginAction({ email: email.trim(), password });

      if (result.success && result.token && result.user) {
        login(result.token, result.user);

        toast.success(`¡Bienvenido, ${result.user.name}!`, {
          duration: 2000,
        });

        // Si es tutor, ir al dashboard de tutor. Si no, a explorar tutorías.
        if (result.user.isTutor) {
          router.push('/dashboard/tutor');
        } else {
          router.push('/encuentra-tutoria');
        }
      } else {
        toast.error(result.error || 'Error al iniciar sesión.');
      }
    } catch {
      toast.error('Error de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-baseline gap-0.5">
            <span className={`${montserrat.className} antialiased text-5xl font-extrabold`} style={{ color: 'var(--primary)' }}>
              Poli
            </span>
            <span className={`${dancingScript.className} antialiased text-2xl`} style={{ color: 'var(--yellow)' }}>
              Tutorías
            </span>
          </div>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Plataforma de tutorías de la Escuela Politécnica Nacional
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Iniciar Sesión
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Ingresa tus credenciales para acceder
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Correo Electrónico
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@epn.edu.ec"
                className="w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none"
                style={{
                  borderColor: 'var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--input-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none pr-12"
                  style={{
                    borderColor: 'var(--input-border)',
                    backgroundColor: 'var(--input-bg)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--input-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                  tabIndex={-1}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-disabled)' }}>¿No tienes cuenta?</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          {/* Register Link */}
          <Link
            href="/registro"
            className="block w-full py-3 rounded-lg border-2 text-center font-semibold text-sm transition-all hover:shadow-sm"
            style={{
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
            }}
          >
            Crear Cuenta
          </Link>
        </div>


      </div>
    </div>
  );
}
