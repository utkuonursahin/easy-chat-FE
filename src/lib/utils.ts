import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function checkAuthentication(name: string, jsessionid: string){
  const raw = await fetch('http://localhost:8080/api/auth/is-authenticated',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `${name}=${jsessionid}`
    },
    credentials: 'include',
    cache: 'no-cache',
  })
  return await raw.json();
}