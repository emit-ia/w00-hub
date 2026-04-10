import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/unlock" ||
    pathname === "/api/unlock"
  ) {
    return NextResponse.next();
  }

  const passphrase = process.env.ACCESS_PASSPHRASE;
  if (!passphrase) return NextResponse.next();

  const cookie = req.cookies.get("access_token")?.value;
  if (cookie === passphrase) return NextResponse.next();

  const unlockUrl = new URL("/unlock", req.url);
  return NextResponse.redirect(unlockUrl);
}

export const proxyConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/unlock).*)"],
};
