"use client";

import { ArrowLeft, GraduationCap, Lightbulb, Brain, Users, Heart, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Definición de cursos (simulada)
const COURSES = [
    {
        id: "anxiety-tips",
        title: "Tips para la Ansiedad",
        lessons: "3 Lecciones",
        completed: true,
        progress: 100, // 100%
        icon: Lightbulb,
        color: "bg-teal-100",
        iconColor: "text-teal-600",
        barColor: "bg-teal-400",
    },
    {
        id: "mental-health-ed",
        title: "Educación en Salud Mental",
        lessons: "3 Lecciones",
        completed: true,
        progress: 100,
        icon: Brain,
        color: "bg-purple-100",
        iconColor: "text-purple-600",
        barColor: "bg-purple-600",
    },
    {
        id: "helping-others",
        title: "Cómo Ayudar a Otros",
        lessons: "3 Lecciones",
        completed: true,
        progress: 100,
        icon: Users,
        color: "bg-orange-100",
        iconColor: "text-orange-600",
        barColor: "bg-orange-500",
    },
    {
        id: "self-care",
        title: "Autocuidado",
        lessons: "2 Lecciones",
        completed: true, // Asumimos completado en el diseño
        progress: 100,
        icon: Heart,
        color: "bg-teal-100", // Reutilizando teal o usando uno nuevo
        iconColor: "text-teal-600",
        barColor: "bg-teal-400",
    },
];

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-white z-10 px-4 py-4 flex items-center gap-4 shadow-sm">
                <Link href="/chat">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                        <ArrowLeft className="size-6 text-foreground" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl font-extrabold text-foreground leading-tight">Rutas de Aprendizaje</h1>
                    <p className="text-sm text-muted-foreground">Cursos interactivos para tu bienestar</p>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-1 w-full max-w-md mx-auto pt-24 pb-8 px-4 space-y-4">

                {/* Hero Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                            <GraduationCap className="size-6 text-teal-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-foreground">Tu camino hacia la calma</h2>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                Completa estos micro-cursos para ganar herramientas reales contra la ansiedad. Aprende a tu propio ritmo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lista de Cursos */}
                <div className="space-y-4">
                    {COURSES.map((course) => (
                        <div key={course.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", course.color)}>
                                        <course.icon className={cn("size-6", course.iconColor)} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{course.title}</h3>
                                        <p className="text-xs text-muted-foreground font-medium">{course.lessons}</p>
                                    </div>
                                </div>
                                {course.completed && (
                                    <div className="bg-green-100 rounded-full p-1">
                                        <CheckCircle2 className="size-5 text-green-600" />
                                    </div>
                                )}
                            </div>

                            {/* Barra de Progreso */}
                            <div className="space-y-1.5">
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full", course.barColor)}
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className={cn("text-xs font-bold text-right", course.iconColor)}>
                                    {course.progress}% completado
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
