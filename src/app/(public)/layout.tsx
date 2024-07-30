import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Easy Chat',
    description: 'No privacy violation. No tracking. Just chat.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen grid grid-cols-[8.5%,1fr,8.5%] grid-rows-[10%,1fr,min-content]">
            {children}
        </main>
    );
}
