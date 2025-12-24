"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Menu, Heart, AlertTriangle, MessageCircle, BookOpen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences.store";

// Tipos para los mensajes
type Message = {
    id: string;
    text: string;
    sender: "user" | "companion";
    timestamp: Date;
};

// Mapa de imagenes de mascotas (debe coincidir con lo que hay en public/assets/mascotas/)
const MASCOT_IMAGES: Record<string, string> = {
    bambu: "/assets/mascotas/bambu.png",
    luna: "/assets/mascotas/luna.png",
    max: "/assets/mascotas/max.png",
    zozo: "/assets/mascotas/zozo.png",
};

export default function ChatPage() {
    const { companionName, companionType } = usePreferencesStore();

    // Fallbacks si no hay datos guardados
    const currentMascotName = companionName || "Compañero";
    const currentMascotImage = companionType ? MASCOT_IMAGES[companionType] : MASCOT_IMAGES["bambu"];

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: `¡Hola! Soy ${currentMascotName}. Estoy aquí contigo. ¿Cómo te sientes?`,
            sender: "companion",
            timestamp: new Date(),
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");

        // Simular respuesta breve
        setTimeout(() => {
            const reply: Message = {
                id: Date.now().toString(),
                text: "Te escucho. Estoy aquí para apoyarte.",
                sender: "companion",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    };

    return (
        // CONTENEDOR PRINCIPAL: 100dvh para altura real en móviles
        <div className="flex flex-col h-[100dvh] bg-background relative overflow-hidden">

            {/* HEADER: Fix en top */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-border shadow-sm z-50 h-[64px]">
                {/* Lado Izquierdo: Mascota */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-secondary/30 border border-secondary overflow-hidden shrink-0">
                        {currentMascotImage ? (
                            <Image
                                src={currentMascotImage}
                                alt={currentMascotName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">🐼</div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-foreground leading-none">{currentMascotName}</h1>
                        <span className="text-xs text-muted-foreground font-medium">Siempre contigo</span>
                    </div>
                </div>

                {/* Botón Crisis y Menú */}
                <div className="flex items-center gap-2">
                    {/* Botón Crisis */}
                    <Link href="/crisis">
                        <Button variant="destructive" size="sm" className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border border-red-100 shadow-none font-bold">
                            <AlertTriangle className="size-4 mr-1.5" />
                            Crisis
                        </Button>
                    </Link>

                    {/* Menú Dropdown */}
                    <div className="relative">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-muted-foreground hover:bg-slate-100 rounded-full">
                            <Menu className="size-6" />
                        </Button>
                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border z-50 py-1 flex flex-col items-stretch overflow-hidden">
                                    <Link href="/chat" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-slate-50 transition-colors">
                                        <MessageCircle className="size-4 text-teal-600" />
                                        Chat
                                    </Link>
                                    <Link href="/learn" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-slate-50 transition-colors">
                                        <BookOpen className="size-4 text-teal-600" />
                                        Aprender
                                    </Link>
                                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-slate-50 transition-colors">
                                        <User className="size-4 text-teal-600" />
                                        Perfil
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* CUERPO DEL CHAT: Padding para no quedar bajo header/footer */}
            <div className="flex-1 overflow-y-auto w-full bg-background scroll-smooth pt-[72px] pb-[88px] px-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full",
                            msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all",
                                msg.sender === "user"
                                    ? "bg-secondary text-foreground rounded-br-none" // Usuario: Color secundario (Teal suave)
                                    : "bg-white text-foreground border border-slate-100 rounded-bl-none" // Mascota: Blanco
                            )}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* FOOTER: Fixed en bottom */}
            <div className="fixed bottom-0 left-0 w-full p-3 bg-white border-t border-slate-100 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Escribe aquí..."
                        className="flex-1 bg-transparent border-none focus:outline-none px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        size="icon"
                        className="rounded-full bg-primary hover:bg-teal-600 shadow-sm shrink-0"
                    >
                        <Send className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
