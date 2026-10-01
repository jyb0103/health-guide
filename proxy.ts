import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "zjh770802";
const COOKIE_NAME = "admin_session";
const SESSION_TOKEN = Buffer.from(ADMIN_PASSWORD).toString("base64");

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.headers.get("x-real-ip")
    ?? req.headers.get("x-forwarded-for")?.split(",").pop()?.trim()
    ?? "unknown";

  if (pathname.startsWith("/api/")) {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] ${req.method} ${pathname} ${ip}`);
    const res = NextResponse.next();
    res.headers.set("x-response-time", `${Date.now() - start}ms`);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
    if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
      const authed = req.cookies.get(COOKIE_NAME)?.value === SESSION_TOKEN;
      if (!authed) return NextResponse.json({ error: "未登录" }, { status: 401 });
    }
    return res;
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
  if (!pathname.startsWith("/admin")) return res;
  if (pathname === "/admin/login") return res;
  const authed = req.cookies.get(COOKIE_NAME)?.value === SESSION_TOKEN;
  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
