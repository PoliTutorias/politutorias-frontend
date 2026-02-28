import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorRegistroData {
  nombreCompleto: string;
  numeroWhatsapp: string;
  facultad: string;
  semestreActual: string;
  biografiaCorta: string;
}

interface RegistroStore {
  datosBasicos: TutorRegistroData;
  setDatosBasicos: (datos: Partial<TutorRegistroData>) => void;
  getDatosBasicos: () => TutorRegistroData;
  clearDatosBasicos: () => void;
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
    }),
    {
      name: 'registro-store',
    }
  )
);
