import React from 'react';
import type { Metadata } from "next";
import {Fira_Sans} from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({ subsets: ["latin"] ,weight: ["300","400", "500"]})

export const metadata: Metadata = {
    title: "Easy Chat",
    description: "No privacy violation. No tracking. Just chat.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${firaSans.className} bg-primary-foreground`}>
            {children}
        </body>
        </html>
    );
}