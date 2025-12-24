'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePreferencesStore } from '@/stores/preferences.store';

export default function EmotionalCheckPage() {
    const router = useRouter();
    const setCrisisMode = usePreferencesStore((state) => state.setCrisisMode);
    const isOnboardingCompleted = usePreferencesStore((state) => state.isOnboardingCompleted);

    useEffect(() => {
        if (isOnboardingCompleted) {
            router.replace('/chat');
        }
    }, [isOnboardingCompleted, router]);

    const handleCrisis = () => {
        setCrisisMode(true);
        router.push('/crisis');
    };

    const handleCalm = () => {
        setCrisisMode(false);
        router.push('/onboarding/companion');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                    Bienvenido a CalmAI
                </h1>
                <p className="text-muted-foreground">Tu espacio seguro comienza aquí.</p>
            </div>

            <Card className="border-2 border-teal-100/50 shadow-xl shadow-teal-500/5 overflow-hidden">
                <div className="h-2 w-full bg-linear-to-r from-teal-400 to-teal-600" />
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl md:text-2xl">
                        ¿Cómo te sientes ahora mismo?
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                        Es importante para nosotros saber si necesitas ayuda inmediata.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <Button
                        variant="destructive"
                        size="xl"
                        className="w-full text-left justify-start relative group transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleCrisis}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AlertCircle className="size-6 mr-3 text-red-100" />
                        <div className="flex flex-col items-start leading-tight">
                            <span className="font-bold text-lg">Sí, me siento mal</span>
                            <span className="text-xs text-red-100 font-normal">Tengo ansiedad, angustia o pánico</span>
                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        size="xl"
                        className="w-full text-left justify-start border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleCalm}
                    >
                        <CheckCircle2 className="size-6 mr-3 text-teal-500" />
                        <div className="flex flex-col items-start leading-tight">
                            <span className="font-bold text-lg text-slate-700 group-hover:text-teal-700">No, estoy bien</span>
                            <span className="text-xs text-slate-400 font-normal group-hover:text-teal-600/70">Solo quiero configurar mi cuenta</span>
                        </div>
                    </Button>
                </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground px-8">
                CalmAI no sustituye la ayuda profesional. <br />
                Si estás en peligro, llama a emergencias.
            </p>
        </motion.div>
    );
}
