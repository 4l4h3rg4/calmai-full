'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Will create simple label if needed or use html label
import { MascotGrid } from '@/components/ui/mascot-grid';
import { usePreferencesStore } from '@/stores/preferences.store';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CompanionPage() {
    const router = useRouter();
    const { companionType, companionName, setCompanion } = usePreferencesStore();

    const [selectedType, setSelectedType] = useState(companionType);
    const [name, setName] = useState(companionName);

    const handleNext = () => {
        if (selectedType && name.trim()) {
            setCompanion(selectedType, name);
            router.push('/onboarding/sensory');
        }
    };

    const isFormValid = selectedType && name.trim().length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-teal-800">
                    Tu compañero de calma
                </h2>
                <p className="text-muted-foreground">
                    Elige quién te acompañará en este viaje y dale un nombre especial.
                </p>
            </div>

            <div className="space-y-6">
                {/* Selección de Mascota */}
                <MascotGrid selected={selectedType} onSelect={setSelectedType} />

                {/* Input de Nombre */}
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <label htmlFor="pet-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ¿Cómo se llamará?
                    </label>
                    <Input
                        id="pet-name"
                        placeholder="Ej. Copito, Zeus, Blanquita..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-lg py-6"
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-muted-foreground"
                >
                    <ArrowLeft className="mr-2 size-4" />
                    Volver
                </Button>
                <Button
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={!isFormValid}
                    onClick={handleNext}
                >
                    Continuar
                    <ArrowRight className="ml-2 size-4" />
                </Button>
            </div>
        </motion.div>
    );
}
