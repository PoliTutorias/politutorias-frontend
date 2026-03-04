import { montserrat, dancingScript } from '@/lib/fonts';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function RegistroExitosoPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
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
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#D1FADF' }}
            >
              <FiCheckCircle
                className="w-12 h-12"
                style={{ color: 'var(--primary)' }}
              />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            ¡Perfil creado!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Ahora puedes publicar tus ofertas de tutorías.
          </p>

          {/* Call to Action Button */}
          <Link
            href="/tutor/dashboard"
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Ir a mi perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
