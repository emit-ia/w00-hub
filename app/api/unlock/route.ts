import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { passphrase } = await req.json();
  const expected = process.env.ACCESS_PASSPHRASE;

  if (!expected || passphrase !== expected) {
    return NextResponse.json({ error: "Wrong passphrase" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("access_token", passphrase, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return res;
}
