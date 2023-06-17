import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/motels', req.url));
    }
    // @ts-ignore
    if(req.nextUrl.pathname === '/motels' && req.nextauth.token?.data?.user?.role !== "superadmin"){
      // @ts-ignore
      return NextResponse.redirect(new URL(`/motels/${req.nextauth.token?.data?.user?.motel_id}`, req.url));
    }
    // if the next path after /motals is not a number and is not equal to the user motel_id and the user is not superadmin
    // @ts-ignore
    if(req.nextUrl.pathname !== '/motels' && isNaN(req.nextUrl.pathname.split('/')[2]) && req.nextUrl.pathname.split('/')[2] !== req.nextauth.token?.data?.user?.motel_id && req.nextauth.token?.data?.user?.role !== "superadmin"){
      // @ts-ignore
      return NextResponse.redirect(new URL(`/motels/${req.nextauth.token?.data?.user?.motel_id}`, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }:any) => !!token?.data?.token,
    }
  }
)

export const config = {
  matcher: ['/motels/:path*', '/'],
}