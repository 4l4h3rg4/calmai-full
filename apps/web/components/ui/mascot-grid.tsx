'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MascotType } from '@/stores/preferences.store';
import { Check } from 'lucide-react';

interface MascotGridProps {
    selected: MascotType | null;
    onSelect: (type: MascotType) => void;
}

const MASCOTS: { id: MascotType; name: string; description: string; color: string }[] = [
    { id: 'bambu', name: 'Bambú', description: 'Tranquilo y fuerte', color: 'bg-emerald-100' },
    { id: 'luna', name: 'Luna', description: 'Dulce y soñadora', color: 'bg-indigo-100' },
    { id: 'max', name: 'Max', description: 'Valiente y leal', color: 'bg-orange-100' },
    { id: 'zozo', name: 'Zozo', description: 'Alegre y curioso', color: 'bg-yellow-100' },
];

export function MascotGrid({ selected, onSelect }: MascotGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {MASCOTS.map((mascot) => {
                const isSelected = selected === mascot.id;

                return (
                    <motion.button
                        key={mascot.id}
                        onClick={() => onSelect(mascot.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 outline-none",
                            isSelected
                                ? "border-teal-500 bg-teal-50 shadow-md ring-2 ring-teal-200"
                                : "border-border hover:border-teal-200 hover:bg-slate-50"
                        )}
                    >
                        {isSelected && (
                            <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1 z-10">
                                <Check className="size-3" />
                            </div>
                        )}

                        <div className={cn("rounded-full p-2 mb-3", mascot.color)}>
                            {/* Asumimos que las imagenes existen en /assets/mascotas/[id].png */}
                            <div className="relative size-20 md:size-24 drop-shadow-sm">
                                <Image
                                    src={`/assets/mascotas/${mascot.id}.png`}
                                    alt={mascot.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <span className="font-semibold text-foreground/90">{mascot.name}</span>
                        <span className="text-xs text-muted-foreground">{mascot.description}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}
