// BACKEND: app/middleware.ts
// این middleware روی همه درخواست‌ها اجرا می‌شود و مسیرهای محافظت‌شده را چک می‌کند.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// مسیرهایی که نیاز به لاگین دارند
const protectedPaths = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // اگر مسیر محافظت‌شده بود
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // گرفتن توکن از localStorage یا cookie → FRONTEND: در SSR localStorage نداریم، پس بهتره Cookie استفاده شود
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // اگر توکن نبود → ریدایرکت به login
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // BACKEND: اینجا می‌تونیم JWT رو verify کنیم
    // import { verifyToken } from "@/lib/jwt";
    // try {
    //   const payload = verifyToken(token);
    // } catch (err) {
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

// مسیرهایی که middleware اجرا می‌شود
export const config = {
  matcher: ["/dashboard/:path*"], // همه مسیرهای زیر /dashboard
};
