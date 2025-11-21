// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protect:
 *  - /en/user-otp/verify  -> requires otp_session cookie
 *  - /en/user/profile     -> requires auth_token cookie
 *
 * If cookie missing: redirect to the appropriate page.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  
  // Protect profile page: only allowed when authenticated
  if (pathname.startsWith("/en/user-profile")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/en", req.url));
    }
  }
  
  return NextResponse.next();
}

/**
 * matcher controls which requests run this middleware.
 * Keep it narrow for performance.
 */
export const config = {
  matcher: [
    "/en/user-profile/:path*",
  ],
};
