import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Privacy {
    showTimestamps: boolean;
    showGuestNames: boolean;
    showNumberGuests: boolean;
    eventPassword: boolean;
    password: string | null;
}

type State = {
    privacy: Privacy;
    errors: any;
};

type Actions = {
    settingPrivacy: (profile: Privacy) => void;
    cleanErrors: () => void;
    resetPrivacy: () => void;

};

const defaultPaymentState: Privacy = {
    showTimestamps: true,
    showGuestNames: true,
    showNumberGuests: true,
    eventPassword: false,
    password: null
};

export const usePrivacyStore = create(
    persist<State & Actions>(
        (set) => ({
            privacy: defaultPaymentState,
            errors: null,
            settingPrivacy: (privacy: Privacy) => set(() => ({
                privacy
            })),
            resetPrivacy: () => set(() => ({ privacy: defaultPaymentState })),
            cleanErrors: () => set(() => ({ errors: null })),
        }),
        {
            name: "privacy",
        }
    )
);