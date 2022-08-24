// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const urlToReturn = new URL(`/auth/login?p=${pathName}`, req.url);

  if (req.nextUrl.pathname.startsWith("/checkout")) {
    let { value } = req.cookies.getWithOptions("token");
    if (!value) {
      return NextResponse.redirect(urlToReturn);
    }

    try {
      await jwtVerify(
        value,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(urlToReturn);
    }
  }
}
