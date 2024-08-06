import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function checkAuthentication(name: string, jsessionid: string) {
    const raw = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/is-authenticated`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `${name}=${jsessionid}`
        },
        credentials: 'include',
        cache: 'no-cache'
    });
    return await raw.json();
}

export function checkAuthorization(path: string, allowedRoles: string[], userRoles: string[]) {
    const protectedPaths: string[] = ['/dashboard'];
    if (protectedPaths.includes(path)) return allowedRoles.some((role) => userRoles.includes(role));
    else return true;
}
