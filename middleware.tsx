import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.rewrite(new URL('/motels', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }:any) => !!token?.data?.token,
    }
  }
)