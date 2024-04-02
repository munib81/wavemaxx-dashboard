// _middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token"); // Assuming you store the token in a cookie

  if (!sessionToken) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Optional: Specify a path pattern for this middleware
export const config = {
  matcher: [
    "/",
    "/system-logs",
    "/remote-devices",
    "/gateway-devices",
    "/notifications",
  ], // Customize the path where this middleware runs
};
