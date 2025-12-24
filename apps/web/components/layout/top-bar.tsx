'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, MessageCircle, BookOpen, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePreferencesStore } from '@/stores/preferences.store';
import Image from 'next/image';

const MENU_ITEMS = [
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/learn', label: 'Aprender', icon: BookOpen },
    { href: '/profile', label: 'Perfil', icon: User },
];

export function TopBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { companionType } = usePreferencesStore();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Fixed Top Bar */}
            <header className="md:hidden fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md border-b z-40 flex items-center justify-between px-4 transition-all">
                <div className="flex items-center gap-2">
                    {/* Logo Icon / Companion Micro-Bubble */}
                    <div className="relative size-8 bg-teal-100 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                        {companionType ? (
                            <Image
                                src={`/assets/mascotas/${companionType}.png`}
                                alt={companionType}
                                fill
                                className="object-contain p-1"
                            />
                        ) : (
                            <div className="size-4 bg-teal-500 rounded-full" />
                        )}
                    </div>
                    <span className="font-bold text-lg text-teal-800 tracking-tight">CalmAI</span>
                </div>

                <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </Button>
            </header>

            {/* Spacer for content below */}
            <div className="md:hidden h-16" />

            {/* Dropdown Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 mt-16"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed top-16 left-0 right-0 bg-background border-b shadow-xl z-50 rounded-b-2xl overflow-hidden origin-top"
                        >
                            <div className="p-4 space-y-1">
                                {MENU_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-xl transition-colors",
                                                isActive
                                                    ? "bg-teal-50 text-teal-700 font-medium"
                                                    : "text-muted-foreground hover:bg-slate-50"
                                            )}
                                        >
                                            <Icon className={cn("size-5", isActive ? "text-teal-600" : "text-slate-400")} />
                                            {item.label}
                                        </Link>
                                    );
                                })}

                                <div className="h-px bg-border my-2" />

                                <button className="w-full flex items-center gap-4 p-4 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-sm font-medium">
                                    <LogOut className="size-5" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
