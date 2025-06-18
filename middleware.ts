import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const isAuth = request.cookies.get("auth_token")?.value
    const lang = request.cookies.get("lang")?.value || 'en';

    console.log(isAuth)
    console.log(request.nextUrl.pathname)

    if (request.nextUrl.pathname.includes('/dashboard') && !isAuth){
         NextResponse.redirect( new URL("/auth/login", request.url)  )
    }

    const response = NextResponse.next();
    response.cookies.set('lang', lang);
    return response;

}

export const config = {
  matcher: ['/dashboard/:path*']
};