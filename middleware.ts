import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const { pathname } = request.nextUrl;
    const isAuth = request.cookies.get("auth_token")?.value
    const lang = request.cookies.get("lang")?.value || 'en';

    const isAuthRoute = pathname.includes(`/auth`);
    const isDashboardRoute = pathname.includes(`/dashboard`);

    console.log("isAuthRoute", isAuthRoute)
    console.log("isDashboardRoute", isDashboardRoute)

    console.log('request.cookies.get("auth_token")',request.cookies.get("auth_token")?.value)
    console.log("All cookies", request.cookies)
    console.log(" ISAUTH ", isAuth)
    console.log("PathName", request.nextUrl.pathname)

    if (isDashboardRoute && !isAuth){
        return NextResponse.redirect( new URL("/auth/login", request.url)  )
    }
    
    if (isAuthRoute && isAuth) {
      // const from = request.nextUrl.searchParams.get("from") || `/dashboard`
      // return NextResponse.redirect(new URL(from, request.url));
      return NextResponse.redirect( new URL("/dashboard", request.url)  )
    }
    return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};