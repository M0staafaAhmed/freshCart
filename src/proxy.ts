import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {

    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    // لو مش logged in وعايز يدخل protected page
    if (!jwt && (pathname.startsWith('/profile') || pathname.startsWith('/cart') || pathname.startsWith('/wishlist') || pathname.startsWith('/orders'))) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // لو logged in وعايز يدخل login أو register
    if (jwt && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register' , '/cart' , '/wishlist']
}