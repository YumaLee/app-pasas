import { create } from "zustand";
import eventoService from "@/shared/services/EventoService";

type TabName = "Proxima" | "Hospedaje" | "Invitacion" | "Asistio" | "Pasado";

interface Evento {
  eventoID: number;
  titulo: string;
  foto: string;
  codigo: string;
  fechaStart: string;
  fechaEnd: string;
  organizador: string;
  avatar: string;
}

interface EventStore {
  eventos: Record<TabName, Evento[]>;
  loading: Record<TabName, boolean>;
  hasMore: Record<TabName, boolean>;
  pagesLoaded: Record<TabName, Set<number>>;
  fetchEventos: (tab: TabName, telefono: string, page?: number) => Promise<void>;
  refreshEventos: (tab: TabName, telefono: string) => Promise<void>;
  reset: () => void;
}

export const useEventosStore = create<EventStore>((set, get) => ({
  eventos: {
    Proxima: [],
    Hospedaje: [],
    Invitacion: [],
    Asistio: [],
    Pasado: [],
  },
  loading: {
    Proxima: false,
    Hospedaje: false,
    Invitacion: false,
    Asistio: false,
    Pasado: false,
  },
  hasMore: {
    Proxima: true,
    Hospedaje: true,
    Invitacion: true,
    Asistio: true,
    Pasado: true,
  },
  pagesLoaded: {
    Proxima: new Set<number>(),
    Hospedaje: new Set<number>(),
    Invitacion: new Set<number>(),
    Asistio: new Set<number>(),
    Pasado: new Set<number>(),

  },

  fetchEventos: async (tab, telefono, page = 1) => {
    const { loading, hasMore, pagesLoaded } = get();

    if (loading[tab] || !hasMore[tab] || pagesLoaded[tab].has(page)) return;

    set((state) => ({
      loading: { ...state.loading, [tab]: true },
    }));

    try {
      const res = await eventoService.listarPorAnfitrion(tab, telefono, page);
      const { items, total } = res.data;

      set((state) => {
        const nuevosEventos = page === 1 ? items : [...state.eventos[tab], ...items];
        const nuevasPaginas = new Set(state.pagesLoaded[tab]);
        nuevasPaginas.add(page);

        const pageSize = 10;
        const totalCargado = nuevosEventos.length;
        const quedanMas = totalCargado < total;

        return {
          eventos: {
            ...state.eventos,
            [tab]: nuevosEventos,
          },
          hasMore: {
            ...state.hasMore,
            [tab]: quedanMas,
          },
          loading: {
            ...state.loading,
            [tab]: false,
          },
          pagesLoaded: {
            ...state.pagesLoaded,
            [tab]: nuevasPaginas,
          },
        };
      });
    } catch (err) {
      console.error(err);
      set((state) => ({
        loading: { ...state.loading, [tab]: false },
      }));
    }
  },

  refreshEventos: async (tab, telefono) => {
    // Limpiar estado del tab antes de recargar
    set((state) => ({
      eventos: { ...state.eventos, [tab]: [] },
      hasMore: { ...state.hasMore, [tab]: true },
      pagesLoaded: { ...state.pagesLoaded, [tab]: new Set<number>() },
    }));

    // Vuelve a cargar la página 1
    await get().fetchEventos(tab, telefono, 1);
  },

  reset: () => {
    set({
      eventos: {
        Proxima: [],
        Hospedaje: [],
        Invitacion: [],
        Asistio: [],
        Pasado: [],
      },
      loading: {
        Proxima: false,
        Hospedaje: false,
        Invitacion: false,
        Asistio: false,
        Pasado: false,
      },
      hasMore: {
        Proxima: true,
        Hospedaje: true,
        Invitacion: true,
        Asistio: true,
        Pasado: true,

      },
      pagesLoaded: {
        Proxima: new Set<number>(),
        Hospedaje: new Set<number>(),
        Invitacion: new Set<number>(),
        Asistio: new Set<number>(),
        Pasado: new Set<number>(),

      },
    });
  },
}));
