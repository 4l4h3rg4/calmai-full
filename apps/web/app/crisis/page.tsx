'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Wind, Eraser, Phone, ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePreferencesStore } from '@/stores/preferences.store';
import { cn } from '@/lib/utils';

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
    const [view, setView] = useState<'menu' | 'breathing'>('menu');

    // Datos de Mascota
    const currentMascotName = companionName || "Compañero";
    const currentMascotImage = companionType ? MASCOT_IMAGES[companionType] : MASCOT_IMAGES["bambu"];

    return (
        <div className="min-h-[100dvh] bg-teal-50/50 flex flex-col relative overflow-hidden">
            {/* Header Global */}
            <header className="fixed top-0 left-0 w-full px-4 py-4 z-50 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => view === 'menu' ? router.push('/chat') : setView('menu')}
                    className="rounded-full hover:bg-black/5"
                >
                    {view === 'menu' ? <X className="size-6 text-slate-700" /> : <ArrowLeft className="size-6 text-slate-700" />}
                </Button>

                {view === 'menu' && (
                    <div className="flex items-center gap-2 text-teal-800 font-bold">
                        <Heart className="size-5 fill-teal-500 text-teal-500" />
                        <span>Espacio de Calma</span>
                    </div>
                )}

                <div className="w-10" /> {/* Spacer */}
            </header>

            <AnimatePresence mode="wait">
                {view === 'menu' ? (
                    <MenuContent
                        key="menu"
                        mascotName={currentMascotName}
                        mascotImage={currentMascotImage}
                        onSelectExercise={(ex) => setView(ex)}
                    />
                ) : (
                    <BreathingExercise key="breathing" />
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Componente: Menú Principal ---
function MenuContent({ mascotName, mascotImage, onSelectExercise }: { mascotName: string, mascotImage: string, onSelectExercise: (v: 'breathing') => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center pt-20 px-6 pb-6 overflow-y-auto"
        >
            {/* Sección Mascota */}
            <div className="relative mb-8 text-center bg-transparent mt-8">
                <div className="w-48 h-48 relative mx-auto drop-shadow-2xl">
                    <Image
                        src={mascotImage}
                        alt={mascotName}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm inline-block -mt-4 relative z-10 border border-white/50">
                    <span className="font-bold text-teal-800 text-sm">{mascotName} está aquí</span>
                </div>
            </div>

            {/* Mensaje */}
            <div className="text-center mb-10 space-y-3 max-w-sm">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Estás en un lugar seguro</h1>
                <p className="text-slate-500 leading-relaxed font-medium">
                    Respira. Este momento difícil pasará. Aquí tienes algunas herramientas para ayudarte a sentirte mejor.
                </p>
            </div>

            {/* Lista de Herramientas */}
            <div className="w-full max-w-sm space-y-4 mb-10">
                <button
                    onClick={() => onSelectExercise('breathing')}
                    className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-all active:scale-[0.98] group text-left"
                >
                    <div className="size-14 bg-teal-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
                        <Wind className="size-7 text-teal-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg">Respiración de Caja</h3>
                        <p className="text-xs text-slate-400 font-medium">Técnica para calmar el sistema nervioso</p>
                    </div>
                    <ChevronRight className="size-5 text-slate-300 group-hover:text-teal-500" />
                </button>

                <button
                    disabled
                    className="w-full bg-white/50 p-5 rounded-3xl border border-slate-50 flex items-center gap-5 cursor-not-allowed opacity-70 grayscale group text-left"
                >
                    <div className="size-14 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Eraser className="size-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg">Limpiar la Pantalla</h3>
                        <p className="text-xs text-slate-400 font-medium">Borra la niebla deslizando el dedo</p>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-400">PRONTO</span>
                </button>
            </div>

            <div className="flex-1" />

            {/* Footer Emergencia */}
            <div className="w-full max-w-sm bg-rose-50 rounded-2xl p-5 border border-rose-100 space-y-3 shadow-none">
                <div className="flex items-center gap-3 text-rose-700">
                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                        <Phone className="size-4" />
                    </div>
                    <span className="font-bold text-sm">¿Necesitas ayuda urgente?</span>
                </div>
                <a
                    href="tel:6003607777"
                    className="block w-full text-center bg-rose-200/50 hover:bg-rose-200 text-rose-800 font-bold py-3 rounded-xl transition-colors text-sm"
                >
                    Llama a la línea de crisis: 600 360 7777
                </a>
            </div>
        </motion.div>
    );
}

// --- Componente: Ejercicio Respiración (Refactorizado) ---
function BreathingExercise() {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [timer, setTimer] = useState(4);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (phase === 'inhale') {
            if (timer > 0) interval = setTimeout(() => setTimer(timer - 1), 1000);
            else { setPhase('hold'); setTimer(7); }
        } else if (phase === 'hold') {
            if (timer > 0) interval = setTimeout(() => setTimer(timer - 1), 1000);
            else { setPhase('exhale'); setTimer(8); }
        } else if (phase === 'exhale') {
            if (timer > 0) interval = setTimeout(() => setTimer(timer - 1), 1000);
            else { setPhase('inhale'); setTimer(4); }
        }
        return () => clearTimeout(interval);
    }, [timer, phase]);

    const getInstruction = () => {
        if (phase === 'inhale') return 'Inhala suavemente...';
        if (phase === 'hold') return 'Mantén el aire...';
        return 'Exhala despacio...';
    };

    const getCircleScale = () => {
        if (phase === 'inhale') return 1.5;
        if (phase === 'hold') return 1.5;
        return 1;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-white h-screen fixed inset-0 z-40"
        >
            <motion.div
                animate={{ scale: getCircleScale() }}
                transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0, ease: "easeInOut" }}
                className="absolute bg-teal-500/20 rounded-full size-64 blur-3xl"
            />

            <div className="relative z-10 text-center space-y-8">
                <motion.div
                    animate={{ scale: getCircleScale(), opacity: phase === 'hold' ? 0.8 : 1 }}
                    transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0, ease: "easeInOut" }}
                    className="size-48 bg-teal-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.5)]"
                >
                    <Wind className="size-16 text-white opacity-50" />
                </motion.div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold transition-all">{getInstruction()}</h2>
                    <p className="text-4xl font-mono text-teal-300 font-light">{timer}</p>
                </div>
            </div>

            <div className="absolute bottom-10 text-slate-400 text-sm px-6 text-center">
                Presiona la flecha arriba a la izquierda para volver al refugio.
            </div>
        </motion.div>
    );
}
