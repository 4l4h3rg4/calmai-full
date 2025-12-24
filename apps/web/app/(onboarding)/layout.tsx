export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 md:p-8">
            <div className="w-full max-w-md mx-auto">
                {children}
            </div>
        </div>
    );
}
