'use client';

import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Mobile Top Navigation */}
            <TopBar />

            {/* Desktop Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            {/* md:ml-64 adds margin to push content right of sidebar on desktop */}
            <main className="flex-1 w-full md:ml-64 min-h-[calc(100vh-4rem)] md:min-h-screen p-4 md:p-8 overflow-x-hidden">
                <div className="max-w-4xl mx-auto h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
