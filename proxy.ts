import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { Token } from "./types/auth";

export async function proxy(request: NextRequest) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const token: Token | null = tokenCookie?.value
    ? JSON.parse(tokenCookie.value)
    : null;

  if (
    (!token || new Date(token.access_token_expration) < new Date()) &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    token &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/songs", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/songs/:path*", "/login", "/register", "/songs/:path*"],
};
