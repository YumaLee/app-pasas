import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Animation {
    emoji: string;
}

type State = {
    animationStore: Animation;
    errors: any;
};

type Actions = {
    settingAnimation: (payment: Animation) => void;
    cleanErrors: () => void;
    resetAnimation: () => void;

};

const defaultPaymentState: Animation = {
    emoji: '',
};

export const useAnimationStore = create(
    persist<State & Actions>(
        (set) => ({
            animationStore: defaultPaymentState,
            errors: null,
            settingAnimation: (animationStore: Animation) => set(() => ({
                animationStore
            })),
            resetAnimation: () => set(() => ({ animationStore: defaultPaymentState })),
            cleanErrors: () => set(() => ({ errors: null })),
        }),
        {
            name: "animation",
        }
    )
);