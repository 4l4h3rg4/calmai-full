'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { usePreferencesStore } from '@/stores/preferences.store';
import { MenuContent } from '@/components/crisis/menu-content';
import { BreathingExercise } from '@/components/crisis/breathing-exercise';
import { CompletionView } from '@/components/crisis/completion-view';
import { GroundingExercise } from '@/components/crisis/grounding-exercise';

// Mapa de imagenes de mascotas (debe coincidir con lo que hay en public/assets/mascotas/)
const MASCOT_IMAGES: Record<string, string> = {
    bambu: "/assets/mascotas/bambu.png",
    luna: "/assets/mascotas/luna.png",
    max: "/assets/mascotas/max.png",
    zozo: "/assets/mascotas/zozo.png",
};

export default function CrisisPage() {
    const router = useRouter();
    const { companionName, companionType } = usePreferencesStore();
    const [view, setView] = useState<'menu' | 'breathing' | 'grounding' | 'completion'>('menu');

    // Datos de Mascota
    const currentMascotName = companionName || "Compañero";
    const currentMascotImage = companionType ? MASCOT_IMAGES[companionType] : MASCOT_IMAGES["bambu"];

    // Handler para volver atrás según la vista
    const handleBack = () => {
        if (view === 'menu') router.push('/chat');
        else if (view === 'breathing' || view === 'grounding') setView('menu');
    }

    return (
        <div className="min-h-[100dvh] bg-teal-50/50 flex flex-col relative overflow-hidden">
            {/* Header Global */}
            {view !== 'completion' && view !== 'grounding' && (
                <header className="fixed top-0 left-0 w-full px-4 py-4 z-50 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="rounded-full hover:bg-black/5"
                    >
                        {view === 'menu' ? <X className="size-6 text-slate-700" /> : <ArrowLeft className="size-6 text-slate-700" />}
                    </Button>

                    <div className="flex items-center gap-2 text-teal-800 font-bold">
                        <Heart className="size-5 fill-teal-500 text-teal-500" />
                        <span>Espacio de Calma</span>
                    </div>

                    <div className="w-10" /> {/* Spacer */}
                </header>
            )}

            <AnimatePresence mode="wait">
                {view === 'menu' ? (
                    <MenuContent
                        key="menu"
                        mascotName={currentMascotName}
                        mascotImage={currentMascotImage}
                        onSelectExercise={(ex) => setView(ex)}
                    />
                ) : view === 'breathing' ? (
                    <BreathingExercise
                        key="breathing"
                        mascotImage={currentMascotImage}
                        onComplete={() => setView('completion')}
                        onCancel={() => setView('menu')}
                    />
                ) : view === 'grounding' ? (
                    <GroundingExercise
                        key="grounding"
                        onComplete={() => setView('completion')}
                        onCancel={() => setView('menu')}
                    />
                ) : (
                    <CompletionView
                        key="completion"
                        mascotImage={currentMascotImage}
                        onRestart={() => setView('menu')} // Volver al menú para elegir
                        onBackToChat={() => router.push('/chat')}
                        onBackToMenu={() => setView('menu')}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
