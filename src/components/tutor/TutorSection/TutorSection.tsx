import { TutorDetailDto } from '@/interfaces/offers/DetallesOfertaDto';
import Image from 'next/image';
import { MdOutlineApartment } from 'react-icons/md';

interface TutorSectionProps {
  tutor: TutorDetailDto;
}

export default function TutorSection({ tutor }: TutorSectionProps) {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      {/* Foto, nombre y datos académicos */}
      <div className="flex gap-3">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0">
          {tutor.profileImageUrl ? (
            <Image
              src={tutor.profileImageUrl}
              alt={tutor.name}
              width={48}
              height={48}
              unoptimized
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-bg-gray flex items-center justify-center text-sm font-bold text-primary">
              {tutor.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Nombre y datos académicos */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-primary">{tutor.name}</h3>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <MdOutlineApartment size={14} />
            <span>{tutor.career}</span>
          </p>
          <p className="text-xs text-text-secondary">
            Semestre: {tutor.semester}
          </p>
        </div>
      </div>

      {/* Descripción del tutor */}
      <p className="text-xs text-foreground leading-relaxed">{tutor.description}</p>

      {/* Materias que domina */}
      <div>
        <p className="text-xs font-semibold text-text-secondary mb-2">Materias que domino:</p>
        <div className="flex flex-wrap gap-2">
          {tutor.masteredSubjects.map((subject, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-sky-100 text-primary rounded-full text-xs font-medium"
            >
              {subject.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
