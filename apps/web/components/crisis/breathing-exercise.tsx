'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BreathingExerciseProps {
    mascotImage: string;
    onComplete: () => void;
    onCancel: () => void;
}

export function BreathingExercise({ mascotImage, onComplete, onCancel }: BreathingExerciseProps) {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
    const [timer, setTimer] = useState(5);
    const [cycle, setCycle] = useState(1);
    const TOTAL_CYCLES = 4;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        // Fases: Inhala (5s) -> Retén (4s) -> Exhala (6s) -> Descanso (2s)
        const tick = () => {
            if (timer > 1) {
                setTimer((t) => t - 1);
            } else {
                handlePhaseChange();
            }
        };

        const handlePhaseChange = () => {
            if (phase === 'inhale') {
                setPhase('hold');
                setTimer(4);
            } else if (phase === 'hold') {
                setPhase('exhale');
                setTimer(6);
            } else if (phase === 'exhale') {
                setPhase('rest');
                setTimer(2);
            } else if (phase === 'rest') {
                if (cycle < TOTAL_CYCLES) {
                    setCycle((c) => c + 1);
                    setPhase('inhale');
                    setTimer(5);
                } else {
                    onComplete();
                }
            }
        };

        interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [timer, phase, cycle, onComplete]);

    const getInstruction = () => {
        if (phase === 'inhale') return 'Inhala';
        if (phase === 'hold') return 'Retén';
        if (phase === 'exhale') return 'Exhala';
        return 'Descansa';
    };

    const getSubInstruction = () => {
        if (phase === 'inhale') return 'Llena tus pulmones de aire';
        if (phase === 'hold') return 'Mantén el aire dentro';
        if (phase === 'exhale') return 'Suelta el aire despacio';
        return 'Prepárate...';
    };

    // Escala del círculo según la fase (Inhala: crece, Retén: mantiene, Exhala: achica)
    const getScale = () => {
        if (phase === 'inhale') return 1.2;
        if (phase === 'hold') return 1.2;
        if (phase === 'exhale') return 1;
        return 1;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full bg-teal-50/50 flex flex-col items-center justify-between py-12 px-6 h-full relative z-40"
        >
            {/* Header / Top */}
            <div className="w-full pt-10 flex justify-center">
                {/* Espacio para header global si se requiere, pero aquí limpio */}
            </div>

            {/* Centro: Mascota y Círculos */}
            <div className="relative flex flex-col items-center justify-center">
                {/* Círculo Exterior (Animado) */}
                <motion.div
                    animate={{ scale: getScale(), opacity: phase === 'rest' ? 0.5 : 1 }}
                    transition={{ duration: phase === 'inhale' ? 5 : phase === 'exhale' ? 6 : 0.5, ease: "easeInOut" }}
                    className="absolute size-72 bg-teal-200/50 rounded-full blur-xl"
                />

                {/* Círculo Indicador "Borde" */}
                <motion.div
                    animate={{ scale: getScale() }}
                    transition={{ duration: phase === 'inhale' ? 5 : phase === 'exhale' ? 6 : 0.5, ease: "easeInOut" }}
                    className="absolute size-64 border-4 border-teal-200/60 rounded-full"
                />

                {/* Mascota Central */}
                <div className="relative size-56 z-10 drop-shadow-lg">
                    <Image
                        src={mascotImage}
                        alt="Mascota"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Timer Flotante */}
                <div className="absolute -bottom-10 z-20 bg-white size-14 rounded-full flex items-center justify-center shadow-md text-2xl font-bold text-teal-600 font-mono">
                    {timer}
                </div>
            </div>

            {/* Validacion y Textos */}
            <div className="text-center space-y-2 mt-8">
                <h2 className="text-4xl font-bold text-teal-700 transition-all duration-500">
                    {getInstruction()}
                </h2>
                <p className="text-slate-500 font-medium text-lg">
                    {getSubInstruction()}
                </p>
            </div>

            {/* Footer: Ciclo y Cancelar */}
            <div className="w-full flex flex-col items-center gap-4 mb-4">
                <span className="text-slate-400 font-medium">Ciclo {cycle} de {TOTAL_CYCLES}</span>
                <button
                    onClick={onCancel}
                    className="text-teal-600 font-bold hover:bg-teal-50 px-4 py-2 rounded-full transition-colors text-sm"
                >
                    Cancelar ejercicio
                </button>
            </div>
        </motion.div>
    );
}
