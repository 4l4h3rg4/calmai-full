'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Hand, Ear, NotebookPen, Utensils, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GroundingExerciseProps {
    onComplete: () => void;
    onCancel: () => void;
}

type Step = {
    count: number;
    verb: string;
    label: string;
    sub: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    placeholder: string;
};

const STEPS: Step[] = [
    {
        count: 5,
        verb: 'VER',
        label: 'cosas que puedes',
        sub: 'colores, formas, objetos cerca de ti',
        icon: Eye,
        color: 'text-teal-600',
        bg: 'bg-teal-100',
        placeholder: 'Escribe algo que puedas ver...'
    },
    {
        count: 4,
        verb: 'TOCAR',
        label: 'cosas que puedes',
        sub: 'texturas, tu ropa, el suelo, el aire',
        icon: Hand,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        placeholder: 'Escribe algo que puedas tocar...'
    },
    {
        count: 3,
        verb: 'OÍR',
        label: 'cosas que puedes',
        sub: 'sonidos lejanos, cercanos, tu respiración',
        icon: Ear,
        color: 'text-indigo-600',
        bg: 'bg-indigo-100',
        placeholder: 'Escribe algo que puedas oír...'
    },
    {
        count: 2,
        verb: 'OLER',
        label: 'cosas que puedes',
        sub: 'aromas en el aire, tu piel, aceites',
        icon: NotebookPen, // Usando NotebookPen como placeholder visual para "Notar" o Nariz si no hay
        color: 'text-rose-600',
        bg: 'bg-rose-100',
        placeholder: 'Escribe algo que puedas oler...'
    },
    {
        count: 1,
        verb: 'SABOREAR',
        label: 'cosa que puedes',
        sub: 'un caramelo, agua, o imagina un sabor',
        icon: Utensils,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        placeholder: 'Escribe algo que puedas saborear...'
    },
];

export function GroundingExercise({ onComplete, onCancel }: GroundingExerciseProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const step = STEPS[currentStepIndex];
    const progress = items.length;
    const isStepComplete = progress >= step.count;

    const handleAddItem = () => {
        if (!inputValue.trim()) return;

        const newItems = [...items, inputValue];
        setItems(newItems);
        setInputValue('');

        if (newItems.length >= step.count) {
            // Wait a moment then proceed
            setTimeout(() => {
                if (currentStepIndex < STEPS.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                    setItems([]);
                } else {
                    onComplete();
                }
            }, 600); // Pequeña pausa para ver el check
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full bg-slate-50 flex flex-col items-center justify-between py-8 px-6 h-full relative z-40"
        >
            {/* Header simple integrado */}
            <div className="w-full flex justify-center items-center relative py-4">
                <h2 className="text-teal-700 font-bold text-lg">Conexión al Presente</h2>
                <button onClick={onCancel} className="absolute left-0 p-2 text-slate-400 hover:text-slate-600">
                    <span className="sr-only">Cancelar</span>
                    {/* Icono X implícito o usando texto si se prefiere */}
                </button>
            </div>

            {/* Contenido Central */}
            <div className="w-full max-w-sm flex flex-col items-center flex-1 justify-center space-y-8">

                {/* Icono Grande */}
                <motion.div
                    key={`icon-${currentStepIndex}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`size-40 rounded-full flex items-center justify-center ${step.bg}`}
                >
                    <step.icon className={`size-20 ${step.color}`} />
                </motion.div>

                {/* Instrucciones */}
                {/* Instrucciones */}
                <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black text-slate-800">
                        {step.count - items.length > 0 ? (
                            <>
                                Nombra <span className={step.color}>{step.count - items.length}</span> {step.count - items.length === 1 ? 'cosa que puedes' : 'cosas que puedes'} {step.verb}
                            </>
                        ) : (
                            <span className="text-teal-600">¡Muy bien!</span>
                        )}
                    </h3>
                    <p className="text-slate-500 font-medium px-4">
                        {step.sub}
                    </p>
                </div>

                {/* Input Area */}
                <div className="w-full space-y-4">
                    <div className="flex gap-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={step.placeholder}
                            className="rounded-xl border-slate-200 py-6 text-lg bg-white shadow-sm focus-visible:ring-teal-500"
                            autoFocus
                        />
                        <Button
                            onClick={handleAddItem}
                            disabled={!inputValue.trim()}
                            className="rounded-xl py-6 px-6 bg-teal-600 hover:bg-teal-700 font-bold shadow-teal-200 shadow-md"
                        >
                            Añadir
                        </Button>
                    </div>

                    {/* Items agregados (Pildoras) */}
                    <div className="flex flex-wrap gap-2 justify-center min-h-[3rem]">
                        <AnimatePresence>
                            {items.map((item, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium shadow-sm flex items-center gap-1"
                                >
                                    <Check className="size-3 text-teal-500" />
                                    {item}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Progreso del paso actual */}
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: step.count }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${i < progress ? `w-8 ${step.bg.replace('100', '500')}` : 'w-2 bg-slate-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer: Paginación Global */}
            <div className="flex gap-3 mt-8">
                {STEPS.map((_, idx) => (
                    <div
                        key={idx}
                        className={`size-3 rounded-full transition-colors duration-300 ${idx === currentStepIndex ? 'bg-teal-500 scale-125' : 'bg-slate-200'}`}
                    />
                ))}
            </div>

            <button onClick={onCancel} className="mt-6 text-slate-400 text-sm hover:text-slate-600">
                Salir del ejercicio
            </button>
        </motion.div>
    );
}
