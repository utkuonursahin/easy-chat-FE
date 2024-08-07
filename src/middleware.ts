import { NextRequest, NextResponse } from 'next/server';
import { checkAuthentication } from '@/lib/utils';

export default async function middleware(req: NextRequest) {
    const jsessionid = req.cookies.get('JSESSIONID');
    if (!jsessionid) return NextResponse.redirect(new URL('/login', req.nextUrl.origin).toString());
    const { statusCode } = await checkAuthentication(jsessionid?.name, jsessionid?.value);
    if (statusCode !== 200) return NextResponse.redirect(new URL('/login', req.nextUrl.origin.toString()));
}

export const config = {
    matcher: ['/chatrooms/:path*', '/search/:path*', '/settings/:path*']
};
