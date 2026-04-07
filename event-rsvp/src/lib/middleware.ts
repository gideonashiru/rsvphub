import { NextResponse, type NextRequest } from "next/server";
import { decodeSessionToken } from "@/lib/auth-utils";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return response;
  }

  // Check for dummy auth session in cookies
  const sessionToken = request.cookies.get('dummy_auth_session')?.value;
  const isAuthenticated = sessionToken ? decodeSessionToken(sessionToken) !== null : false;

  const PUBLIC_PATHS = ["/auth", "/login", "/about", "/contact"];

  const isPublic = PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Redirect unauthenticated users away from protected routes
  if (
    !isAuthenticated && !isPublic &&
    request.nextUrl.pathname !== "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return response;
}
