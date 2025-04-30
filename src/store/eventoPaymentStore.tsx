import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Payment {
    isPaid: boolean;
    wasPaid: boolean;
}

type State = {
    paymentStore: Payment;
    errors: any;
};

type Actions = {
    settingPayment: (payment: Payment) => void;
    cleanErrors: () => void;
    resetPayment: () => void;

};

const defaultPaymentState: Payment = {
    isPaid: false,
    wasPaid: false
};

export const useEventoPayStore = create(
    persist<State & Actions>(
        (set) => ({
            paymentStore: defaultPaymentState,
            errors: null,
            settingPayment: (paymentStore: Payment) => set(() => ({
                paymentStore
            })),
            resetPayment: () => set(() => ({ paymentStore: defaultPaymentState })),
            cleanErrors: () => set(() => ({ errors: null })),
        }),
        {
            name: "payment",
        }
    )
);