'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { montserrat, dancingScript } from '@/lib/fonts';
import { registerAction } from '@/actions/auth/authActions';
import { useAuthStore } from '@/lib/stores/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<'student' | 'tutor'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (role: 'student' | 'tutor') => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Nombre solo obligatorio para estudiantes
    if (selectedRole === 'student' && (!name.trim() || name.trim().length < 3)) {
      toast.error('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error('Completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerAction({
        name: selectedRole === 'student' ? name.trim() : email.trim().split('@')[0],
        email: email.trim(),
        password,
      });

      if (result.success && result.token && result.user) {
        login(result.token, result.user);

        if (selectedRole === 'tutor') {
          toast.success('¡Cuenta creada! Completa tu perfil de tutor.', {
            duration: 3000,
          });
          router.push('/registro/tutor');
        } else {
          toast.success('¡Cuenta creada exitosamente!', {
            duration: 2000,
          });
          router.push('/encuentra-tutoria');
        }
      } else {
        toast.error(result.error || 'Error al registrar.');
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
            Crea tu cuenta para empezar
          </p>
        </div>

        {/* Card de Registro */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Crear Cuenta
          </h1>

          {/* Role Selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Quiero registrarme como:
            </p>
            <div className="flex items-center gap-6">
              <label
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                style={{ color: selectedRole === 'student' ? 'var(--primary)' : 'var(--text-secondary)' }}
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={selectedRole === 'student'}
                  onChange={() => handleRoleChange('student')}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: 'var(--yellow)' }}
                />
                Estudiante
              </label>
              <label
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                style={{ color: selectedRole === 'tutor' ? 'var(--primary)' : 'var(--text-secondary)' }}
              >
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  checked={selectedRole === 'tutor'}
                  onChange={() => handleRoleChange('tutor')}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: 'var(--yellow)' }}
                />
                Tutor
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name - Solo para estudiantes */}
            {selectedRole === 'student' && (
            <div>
              <label htmlFor="register-name" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Nombre Completo
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Carlos Pérez"
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none"
                style={{
                  borderColor: 'var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--input-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                autoComplete="name"
                disabled={isLoading}
              />
            </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Correo Electrónico
              </label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none pr-12"
                  style={{
                    borderColor: 'var(--input-border)',
                    backgroundColor: 'var(--input-bg)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--input-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="register-confirm" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                Confirmar Contraseña
              </label>
              <input
                id="register-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none"
                style={{
                  borderColor: 'var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--input-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                autoComplete="new-password"
                disabled={isLoading}
              />
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
                  Creando cuenta...
                </span>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-disabled)' }}>¿Ya tienes cuenta?</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          {/* Login Link */}
          <Link
            href="/"
            className="block w-full py-3 rounded-lg border-2 text-center font-semibold text-sm transition-all hover:shadow-sm"
            style={{
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
            }}
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
