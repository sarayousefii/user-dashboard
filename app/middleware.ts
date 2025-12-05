
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
