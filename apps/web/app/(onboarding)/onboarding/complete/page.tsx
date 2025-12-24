'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePreferencesStore } from '@/stores/preferences.store';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CompletePage() {
    const router = useRouter();
    const { companionName, completeOnboarding } = usePreferencesStore();

    useEffect(() => {
        // Marcar como completado
        completeOnboarding();

        // Celebración suave
        const end = Date.now() + 1000;
        const colors = ['#14b8a6', '#f0fdfa', '#ccfbf1'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, [completeOnboarding]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="size-24 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600"
            >
                <CheckCircle2 className="size-12" />
            </motion.div>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-teal-900">¡Todo listo!</h1>
                <p className="text-lg text-muted-foreground px-4">
                    Has creado tu espacio seguro. <strong>{companionName}</strong> te está esperando para conversar.
                </p>
            </div>

            <div className="pt-8 space-y-3">
                <Button
                    size="xl"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-200"
                    onClick={() => router.push('/chat')}
                >
                    <MessageCircle className="mr-2 size-5" />
                    Ir a conversar
                </Button>

                <p className="text-xs text-muted-foreground pt-4">
                    Recuerda: CalmAI está aquí para acompañarte,<br />pero tú tienes el control.
                </p>
            </div>
        </motion.div>
    );
}
