import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Provider } from 'jotai';
import { Toaster } from 'sonner';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
    title: 'Easy Chat',
    description: 'No privacy violation. No tracking. Just chat.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className} bg-primary-foreground`}>
                <Provider>{children}</Provider>
                <Toaster richColors={true} position="top-center" />
            </body>
        </html>
    );
}
