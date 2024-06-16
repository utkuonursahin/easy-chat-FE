import type { Metadata } from "next";
import {Fira_Sans} from "next/font/google";
import "../globals.css";

const firaSans = Fira_Sans({ subsets: ["latin"] ,weight: ["300","400", "500"]})

export const metadata: Metadata = {
  title: "Easy Chat",
  description: "No privacy violation. No tracking. Just chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={firaSans.className}>
      <main className="min-h-screen grid grid-cols-[8.5%,1fr,8.5%] grid-rows-[10%,1fr,min-content]">
        {children}
      </main>
    </body>
    </html>
  );
}
