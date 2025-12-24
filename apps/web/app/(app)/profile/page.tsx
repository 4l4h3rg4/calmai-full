export default function ProfilePage() {
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold text-teal-900 mb-6">Tu Perfil</h1>
            <div className="bg-white border rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-4">
                    <div className="size-16 bg-slate-200 rounded-full" />
                    <div>
                        <h3 className="font-semibold text-lg">Usuario CalmAI</h3>
                        <p className="text-muted-foreground">Configuración de cuenta</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground pt-4 border-t">Más opciones próximamente...</p>
            </div>
        </div>
    );
}
