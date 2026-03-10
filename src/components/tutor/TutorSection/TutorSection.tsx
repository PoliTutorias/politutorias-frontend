import { Star } from 'lucide-react';
import { TutorDetailDto } from '@/interfaces/offers/DetallesOfertaDto';

interface TutorSectionProps {
  tutor: TutorDetailDto;
}

export default function TutorSection({ tutor }: TutorSectionProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-base font-semibold text-primary mb-4">Sobre el Tutor</h2>

      {/* Card del tutor */}
      <div className="bg-white border border-border rounded-lg p-4 space-y-4">
        {/* Foto, nombre y datos académicos */}
        <div className="flex gap-3">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0">
            {tutor.profileImageUrl ? (
              <img
                src={tutor.profileImageUrl}
                alt={tutor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-bg-gray flex items-center justify-center text-sm font-bold text-primary">
                {tutor.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Nombre, carrera, semestre */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-primary">{tutor.name}</h3>
            <p className="text-xs text-text-secondary">
              📚 {tutor.career} ☁️ {tutor.semester}
            </p>
            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-yellow fill-yellow" />
              <span className="text-xs font-semibold text-foreground">
                {tutor.rating} ({tutor.reviewsCount} reseñas)
              </span>
            </div>
          </div>
        </div>

        {/* Descripción del tutor */}
        <p className="text-xs text-foreground leading-relaxed">{tutor.description}</p>

        {/* Materias que domina */}
        <div>
          <p className="text-xs font-semibold text-text-secondary mb-2">Materias que domino:</p>
          <div className="flex flex-wrap gap-1.5">
            {tutor.masteredSubjects.map((subject, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium"
              >
                {subject.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
