import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: number;
    userName: string;
    userGroup: string;
    session: string;
    mainGroup: string;
    integrationCode: string | null;
    telefono: string | null;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    correo: string | null;
    foto: string;
    token: string;
    flagAdministrador: boolean;
    flagVerificado: boolean;
    joinDate: string | null;
}

type State = {
    profile: User | null;
    isAuth: boolean;
    errors: any;
    countAsistencia: number | 0;
};

type Actions = {
    login: (profile: User) => void;
    logout: () => void;
    cleanErrors: () => void;
    setProfileName: (nombre: string) => void;
    setCountAsistente: (cantidad: number) => void;

};

export const useAuthStore = create(
    persist<State & Actions>(
        (set) => ({
            token: null,
            profile: null,
            isAuth: false,
            errors: null,
            countAsistencia: 0,
            setProfileName: (nombre: string) =>
                set((state) => ({
                    profile: state.profile ? { ...state.profile, nombre } : { nombre } as User,
                })),
            setCountAsistente: (cantidad: number) =>
                set(() => ({
                    countAsistencia: cantidad
                })),
            login: (profile: User) => set(() => ({
                profile,
                isAuth: true
            })),
            logout: () => set(() => ({ token: null, profile: null, isAuth: false })),
            cleanErrors: () => set(() => ({ errors: null })),
        }),
        {
            name: "user",
        }
    )
);