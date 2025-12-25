'use client';

import { motion } from 'framer-motion';
import { Wind, Eraser, ChevronRight, Phone, Eye } from 'lucide-react';
import Image from 'next/image';

interface MenuContentProps {
    mascotName: string;
    mascotImage: string;
    onSelectExercise: (v: 'breathing' | 'grounding') => void;
}

export function MenuContent({ mascotName, mascotImage, onSelectExercise }: MenuContentProps) {
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
                    onClick={() => onSelectExercise('grounding')}
                    className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-all active:scale-[0.98] group text-left"
                >
                    <div className="size-14 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                        <Eye className="size-7 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg">Conexión 5-4-3-2-1</h3>
                        <p className="text-xs text-slate-400 font-medium">Usa tus sentidos para volver al presente</p>
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
