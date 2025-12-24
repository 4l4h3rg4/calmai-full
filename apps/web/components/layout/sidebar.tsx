'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    MessageCircle,
    BookOpen,
    User,
    LogOut,
    Settings
} from 'lucide-react';
import { usePreferencesStore } from '@/stores/preferences.store';
import Image from 'next/image';

const MENU_ITEMS = [
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/learn', label: 'Aprender', icon: BookOpen },
    { href: '/profile', label: 'Perfil', icon: User },
];

export function Sidebar() {
    const pathname = usePathname();
    const { companionType, companionName } = usePreferencesStore();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen border-r bg-sidebar border-sidebar-border fixed left-0 top-0 z-30">
            {/* Header - Brand */}
            <div className="p-6 border-b border-sidebar-border">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                    CalmAI
                </h1>
                <p className="text-xs text-muted-foreground">Tu espacio seguro</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-teal-50 text-teal-700 shadow-sm"
                                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("size-5", isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Companion Status - Bottom */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="relative size-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                        {companionType ? (
                            <Image
                                src={`/assets/mascotas/${companionType}.png`}
                                alt={companionType}
                                fill
                                className="object-contain p-1"
                            />
                        ) : (
                            <User className="size-5 text-teal-600" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">
                            {companionName || 'Tu compañero'}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex size-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-2 bg-teal-500"></span>
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                                Listo para hablar
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex justify-between px-1">
                    <button className="text-xs text-slate-400 hover:text-teal-600 flex items-center gap-1 transition-colors">
                        <Settings className="size-3" /> Config
                    </button>
                    <button className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors">
                        <LogOut className="size-3" /> Salir
                    </button>
                </div>
            </div>
        </aside>
    );
}
