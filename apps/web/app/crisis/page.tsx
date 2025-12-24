'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Wind, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CrisisPage() {
    const router = useRouter();
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [timer, setTimer] = useState(4);

    // Lógica simple de respiración 4-7-8
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (phase === 'inhale') {
            if (timer > 0) {
                interval = setTimeout(() => setTimer(timer - 1), 1000);
            } else {
                setPhase('hold');
                setTimer(7);
            }
        } else if (phase === 'hold') {
            if (timer > 0) {
                interval = setTimeout(() => setTimer(timer - 1), 1000);
            } else {
                setPhase('exhale');
                setTimer(8);
            }
        } else if (phase === 'exhale') {
            if (timer > 0) {
                interval = setTimeout(() => setTimer(timer - 1), 1000);
            } else {
                setPhase('inhale');
                setTimer(4);
            }
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
        <div className="fixed inset-0 bg-slate-950 text-white flex flex-col items-center justify-between p-6 overflow-hidden">
            {/* Header */}
            <div className="w-full flex justify-between items-center z-10">
                <span className="font-bold text-lg text-teal-400">Modo Calma</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 rounded-full"
                    onClick={() => router.push('/onboarding')}
                >
                    <X className="size-6" />
                </Button>
            </div>

            {/* Breathing Circle Content */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-sm">
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

                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        Sigue el ritmo. Concéntrate solo en el círculo y en tu respiración. Estás a salvo.
                    </p>
                </div>
            </div>

            {/* Emergency Action */}
            <div className="w-full max-w-sm space-y-4 pb-8 z-10">
                <Button
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white border-none py-6 rounded-xl text-lg font-medium shadow-lg shadow-rose-900/20"
                >
                    <Phone className="mr-2 size-5" />
                    Necesito hablar con alguien
                </Button>
                <p className="text-center text-xs text-slate-500">
                    Si sientes que no puedes controlarlo, pide ayuda inmediatamente.
                </p>
            </div>
        </div>
    );
}
