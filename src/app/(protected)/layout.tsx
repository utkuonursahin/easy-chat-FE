import AppNav from "@/components/AppNav/AppNav";
import {AppNavItem} from "@/components/AppNav/AppNavItem/AppNavItem";
import {Cog, MessagesSquare, Search} from "lucide-react";

export const metadata = {
  title: 'EasyChat - Dashboard',
  description: 'Generated by Next.js',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <main className="min-h-screen grid grid-rows-[calc(100vh-4rem),4rem] grid-cols-1 overflow-x-hidden">
        {children}
        <AppNav>
            <AppNavItem href="/chatrooms">
                <MessagesSquare color="#f8fafc"/>
            </AppNavItem>
            <AppNavItem href="/settings">
                <Cog color="#f8fafc"/>
            </AppNavItem>
            <AppNavItem href="/search">
                <Search color="#f8fafc"/>
            </AppNavItem>
        </AppNav>
      </main>
  )
}
