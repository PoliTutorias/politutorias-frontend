import { Category } from '@/interfaces/oferta/Category';

export function getCategoriesSeed(): Category[] {
  return [
    // ÁREA DE CONOCIMIENTO
    { id: 'area-001', name: 'Matemática', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-002', name: 'Física', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-003', name: 'Química', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-004', name: 'Programación', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-005', name: 'Electrónica', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-006', name: 'Mecánica', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-007', name: 'Termodinámica', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-008', name: 'Geología', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-009', name: 'Ambiental', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-010', name: 'Administración', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-011', name: 'Economía', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-012', name: 'Estadística', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-013', name: 'Dibujo Técnico', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-014', name: 'Resistencia de Materiales', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-015', name: 'Telecomunicaciones', group: 'ÁREA DE CONOCIMIENTO' },
    { id: 'area-016', name: 'Control y Automatización', group: 'ÁREA DE CONOCIMIENTO' },

    // NIVEL
    { id: 'nivel-001', name: 'Nivelación', group: 'NIVEL' },
    { id: 'nivel-002', name: 'Formación Básica', group: 'NIVEL' },
    { id: 'nivel-003', name: 'Materias de Carrera', group: 'NIVEL' },
    { id: 'nivel-004', name: 'Avanzado', group: 'NIVEL' },

    // TIPO DE APOYO
    { id: 'apoyo-001', name: 'Preparación de Exámenes', group: 'TIPO DE APOYO' },
    { id: 'apoyo-002', name: 'Resolución de Ejercicios', group: 'TIPO DE APOYO' },
    { id: 'apoyo-003', name: 'Laboratorios', group: 'TIPO DE APOYO' },
    { id: 'apoyo-004', name: 'Proyectos', group: 'TIPO DE APOYO' },
    { id: 'apoyo-005', name: 'Deberes', group: 'TIPO DE APOYO' },

    // FACULTAD
    { id: 'fac-001', name: 'FIS - Sistemas', group: 'FACULTAD' },
    { id: 'fac-002', name: 'FIEE - Eléctrica y Electrónica', group: 'FACULTAD' },
    { id: 'fac-003', name: 'FC - Ciencias', group: 'FACULTAD' },
    { id: 'fac-004', name: 'FICA - Civil y Ambiental', group: 'FACULTAD' },
    { id: 'fac-005', name: 'FIM - Mecánica', group: 'FACULTAD' },
    { id: 'fac-006', name: 'FIQA - Química y Agroindustria', group: 'FACULTAD' },
    { id: 'fac-007', name: 'FIGP - Geología y Petróleos', group: 'FACULTAD' },
    { id: 'fac-008', name: 'FCA - Ciencias Administrativas', group: 'FACULTAD' },
    { id: 'fac-009', name: 'ESFOT - Formación de Tecnólogos', group: 'FACULTAD' },
  ];
}
