import { Briefcase } from 'lucide-react';
import { ExperienceDto } from '@/interfaces/offers/DetallesOfertaDto';

interface ExperienceSectionProps {
  experiences: ExperienceDto[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
        <Briefcase size={18} className="text-primary" />
        <span>Experiencia</span>
      </h3>

      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-[color:var(--yellow)] pl-4 pb-3 last:pb-0">
            <h4 className="text-xs font-bold text-foreground">{exp.position}</h4>
            <p className="text-xs text-text-secondary">{exp.institution}</p>
            <p className="text-xs text-text-secondary">{exp.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
