'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { usePreferencesStore } from '@/stores/preferences.store';
import { Lock } from 'lucide-react';

export default function AuthPage() {
    const router = useRouter();
    const { companionName } = usePreferencesStore();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrar lógica real de Supabase aquí
        // Por ahora simulamos éxito
        router.push('/onboarding/complete');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
        >
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-teal-800">Casi listo</h2>
                <p className="text-muted-foreground">
                    Crea tu cuenta para guardar a <strong>{companionName || 'tu compañero'}</strong> y asegurar que tu espacio seguro siempre esté aquí.
                </p>
            </div>

            <Card className="border-teal-100 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <Lock className="size-5 text-teal-500" />
                        Cuenta Segura
                    </CardTitle>
                    <CardDescription className="text-center">
                        Tus datos son privados y confidenciales.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Correo electrónico</label>
                            <Input type="email" placeholder="hola@ejemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input type="password" placeholder="••••••••" required />
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4">
                            Crear cuenta y Finalizar
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-xs text-muted-foreground">
                        ¿Ya tienes cuenta? <span className="text-teal-600 font-semibold cursor-pointer">Iniciar sesión</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
