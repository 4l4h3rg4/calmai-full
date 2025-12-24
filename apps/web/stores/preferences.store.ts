import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MascotType = 'bambu' | 'luna' | 'max' | 'zozo';
export type SoundType = 'rain' | 'ocean' | 'forest' | 'silence';

interface PreferencesState {
    // Estado de Crisis
    isCrisisMode: boolean;
    setCrisisMode: (isCrisis: boolean) => void;

    // Preferencias de Compañero
    companionName: string;
    companionType: MascotType | null;
    setCompanion: (type: MascotType, name: string) => void;

    // Preferencias Sensoriales
    soundType: SoundType;
    setSound: (type: SoundType) => void;

    // Estado del Onboarding
    isOnboardingCompleted: boolean;
    completeOnboarding: () => void;

    // Limpiar estado (para logout o reset)
    reset: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
    persist(
        (set) => ({
            isCrisisMode: false,
            setCrisisMode: (isCrisis) => set({ isCrisisMode: isCrisis }),

            companionName: '',
            companionType: null,
            setCompanion: (type, name) => set({ companionType: type, companionName: name }),

            soundType: 'silence',
            setSound: (type) => set({ soundType: type }),

            isOnboardingCompleted: false,
            completeOnboarding: () => set({ isOnboardingCompleted: true }),

            reset: () => set({
                isCrisisMode: false,
                companionName: '',
                companionType: null,
                soundType: 'silence',
                isOnboardingCompleted: false
            })
        }),
        {
            name: 'calmai-preferences', // nombre para localStorage
        }
    )
);
