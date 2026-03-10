import BackButton from '@/components/shared/BackButton/BackButton';

export default function HeaderComponent() {
  return (
    <header className="bg-primary text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Botón Volver */}
        <div className="text-white">
          <BackButton />
        </div>

        {/* Logo PoliTutorias */}
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Poli<span className="text-yellow">tutorias</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
