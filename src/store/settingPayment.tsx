import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Payment {
    requireAmount: string;
    currency: string;
    amount: number;
    methodPay: number;
    codigo: string;
}

type State = {
    payment: Payment;
    errors: any;
};

type Actions = {
    settingPayment: (payment: Payment) => void;
    cleanErrors: () => void;
    resetPayment: () => void;
    //setDefaultCurrencyByRegion: () => void;
};

const getDefaultCurrency = (): string => {
    try {
        const region = new Intl.Locale(navigator.language).region;
        if (region === "PE") {
            return "PEN";
        } else if (region === "US") {
            return "USD";
        } else if (region === "ES") {
            return "EUR";
        }
        return "USD";
    } catch (error) {
        console.error("Error al obtener la región o establecer la moneda:", error);
        return "USD"; // Moneda por defecto en caso de error
    }
};

const defaultPaymentState: Payment = {
    requireAmount: "1",
    currency: "1",
    amount: 0,
    methodPay: 1,
    codigo: getDefaultCurrency(), // Establecer la moneda por defecto al inicio
};

export const usePaymentStore = create(
    persist<State & Actions>(
        (set, get) => ({
            payment: defaultPaymentState,
            errors: null,
            settingPayment: (payment: Payment) => set(() => ({
                payment
            })),
            resetPayment: () => set(() => ({
                payment: defaultPaymentState
            })),
            cleanErrors: () => set(() => ({
                errors: null
            }))
        }),
        {
            name: "payment",
        }
    )
);