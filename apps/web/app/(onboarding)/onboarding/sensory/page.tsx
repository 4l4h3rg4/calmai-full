'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SoundSelector } from '@/components/ui/sound-selector';
import { usePreferencesStore, SoundType } from '@/stores/preferences.store';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SensoryPage() {
    const router = useRouter();
    const { soundType, setSound } = usePreferencesStore();
    const [previewSound, setPreviewSound] = useState<SoundType>(soundType);

    // Efecto para simular cambio de fondo (En una app real esto cambiaría el layout global)
    // Aquí es solo visual local para la demo
    const getBackgroundGradient = (type: SoundType) => {
        switch (type) {
            case 'rain': return 'from-slate-100 to-slate-200';
            case 'ocean': return 'from-blue-50 to-blue-100';
            case 'forest': return 'from-emerald-50 to-emerald-100';
            default: return 'from-white to-orange-50/50';
        }
    };

    const handleNext = () => {
        setSound(previewSound);
        router.push('/onboarding/auth');
    };

    return (
        <div className="relative">
            {/* Background Layer Animation */}
            <AnimatePresence>
                <motion.div
                    key={previewSound}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={`fixed inset-0 bg-linear-to-b ${getBackgroundGradient(previewSound)} -z-10`}
                />
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
            >
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-teal-900">
                        Tu espacio seguro
                    </h2>
                    <p className="text-slate-600">
                        Elige el ambiente que te haga sentir más en paz.
                    </p>
                </div>

                <div className="space-y-6">
                    <SoundSelector selected={previewSound} onSelect={setPreviewSound} />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-slate-600 hover:bg-white/50"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Volver
                    </Button>
                    <Button
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-900/10"
                        onClick={handleNext}
                    >
                        Me gusta este
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
