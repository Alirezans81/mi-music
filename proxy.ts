import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");

  if (
    !tokenCookie &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    tokenCookie &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register", '/songs/:path*'],
};
