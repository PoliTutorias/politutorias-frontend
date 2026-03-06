import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';

interface TutorRegistroData {
  nombreCompleto: string;
  numeroWhatsapp: string;
  facultad: string;
  semestreActual: string;
  biografiaCorta: string;
}

interface RegistroStore {
  datosBasicos: TutorRegistroData;
  fotoPerfil: string | null;
  disponibilidad: AvailabilityBlock[];
  setDatosBasicos: (datos: Partial<TutorRegistroData>) => void;
  getDatosBasicos: () => TutorRegistroData;
  clearDatosBasicos: () => void;
  setFotoPerfil: (foto: string | null) => void;
  getFotoPerfil: () => string | null;
  setDisponibilidad: (blocks: AvailabilityBlock[]) => void;
  getDisponibilidad: () => AvailabilityBlock[];
  clearDisponibilidad: () => void;
}

export const useRegistroStore = create<RegistroStore>()(
  persist(
    (set, get) => ({
      datosBasicos: {
        nombreCompleto: '',
        numeroWhatsapp: '',
        facultad: '',
        semestreActual: '',
        biografiaCorta: '',
      },
      fotoPerfil: null,
      disponibilidad: [],
      setDatosBasicos: (datos) =>
        set((state) => ({
          datosBasicos: {
            ...state.datosBasicos,
            ...datos,
          },
        })),
      getDatosBasicos: () => get().datosBasicos,
      clearDatosBasicos: () =>
        set({
          datosBasicos: {
            nombreCompleto: '',
            numeroWhatsapp: '',
            facultad: '',
            semestreActual: '',
            biografiaCorta: '',
          },
        }),
      setFotoPerfil: (foto) =>
        set({
          fotoPerfil: foto,
        }),
      getFotoPerfil: () => get().fotoPerfil,
      setDisponibilidad: (blocks) =>
        set({
          disponibilidad: blocks,
        }),
      getDisponibilidad: () => get().disponibilidad,
      clearDisponibilidad: () =>
        set({
          disponibilidad: [],
        }),
    }),
    {
      name: 'registro-store',
    }
  )
);
