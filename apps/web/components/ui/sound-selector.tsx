'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SoundType } from '@/stores/preferences.store';
import { CloudRain, Music, Trees, VolumeX, Waves } from 'lucide-react';

interface SoundSelectorProps {
    selected: SoundType;
    onSelect: (type: SoundType) => void;
}

const SOUNDS: { id: SoundType; label: string; icon: any; color: string }[] = [
    { id: 'rain', label: 'Lluvia Suave', icon: CloudRain, color: 'bg-slate-100 text-slate-600' },
    { id: 'ocean', label: 'Olas del Mar', icon: Waves, color: 'bg-blue-100 text-blue-600' },
    { id: 'forest', label: 'Bosque', icon: Trees, color: 'bg-green-100 text-green-600' },
    { id: 'silence', label: 'Silencio', icon: VolumeX, color: 'bg-gray-100 text-gray-500' },
];

export function SoundSelector({ selected, onSelect }: SoundSelectorProps) {
    return (
        <div className="grid grid-cols-1 gap-3">
            {SOUNDS.map((sound) => {
                const Icon = sound.icon;
                const isSelected = selected === sound.id;

                return (
                    <motion.button
                        key={sound.id}
                        onClick={() => onSelect(sound.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left",
                            isSelected
                                ? "border-teal-500 bg-teal-50 ring-1 ring-teal-200"
                                : "border-border hover:border-teal-200 hover:bg-slate-50"
                        )}
                    >
                        <div className={cn("p-2 rounded-full", sound.color)}>
                            <Icon className="size-5" />
                        </div>

                        <div className="flex-1">
                            <span className="block font-medium text-foreground">{sound.label}</span>
                        </div>

                        {isSelected && (
                            <div className="flex gap-1 items-end h-4">
                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-teal-500 rounded-full" />
                                <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} className="w-1 bg-teal-500 rounded-full" />
                                <motion.div animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-teal-500 rounded-full" />
                            </div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
