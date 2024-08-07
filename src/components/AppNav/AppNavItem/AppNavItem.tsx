'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AppNavItemProps = {
    href: string;
    children: React.ReactNode;
};

export function AppNavItem({ href, children }: AppNavItemProps) {
    const pathName = usePathname();
    return (
        <Link
            href={href}
            className={`p-3 rounded-full ${pathName.includes(href) && 'bg-primary-foreground/20'} transition-all duration-300`}
        >
            {children}
        </Link>
    );
}
