'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface CompletionViewProps {
    mascotImage: string;
    onRestart: () => void;
    onBackToChat: () => void;
    onBackToMenu: () => void;
}

export function CompletionView({ mascotImage, onRestart, onBackToChat, onBackToMenu }: CompletionViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center h-full bg-teal-50/50"
        >
            <div className="relative mb-6">
                {/* Destellos decorativos (simulados con lucide o divs) */}
                <div className="absolute -top-4 -right-4 text-yellow-400 animate-pulse delay-75"><i className="text-4xl">✨</i></div>
                <div className="absolute -bottom-2 -left-4 text-yellow-400 animate-pulse"><i className="text-2xl">✨</i></div>

                <div className="w-48 h-48 relative drop-shadow-2xl">
                    <Image src={mascotImage} alt="Mascota Feliz" fill className="object-contain" />
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-2">¡Lo hiciste increíble!</h2>
            <p className="text-slate-600 max-w-xs mx-auto mb-10 leading-relaxed">
                Cada vez que practicas, tu mente se fortalece. Estamos orgullosos de ti.
            </p>

            <div className="w-full max-w-sm space-y-3">
                <Button
                    onClick={onBackToChat}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full py-6 text-lg shadow-lg shadow-teal-600/20"
                >
                    <Heart className="size-5 mr-2 fill-current" />
                    Conversar
                </Button>

                <Button
                    onClick={onRestart}
                    variant="outline"
                    className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 rounded-full py-6 text-lg bg-white"
                >
                    Hacer otro ejercicio
                </Button>

                <button
                    onClick={onBackToMenu}
                    className="text-slate-400 text-sm font-medium hover:text-slate-600 py-2"
                >
                    Volver al inicio
                </button>
            </div>
        </motion.div>
    );
}
