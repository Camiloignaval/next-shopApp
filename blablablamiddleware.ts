import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
  // console.log({ req });
  const cookie = req.headers.get("cookie");
  const adminRoles = ["admin", "super-admin", "SEO"];
  const session: any = await getSession({
    req: { headers: { cookie } } as any,
  });
  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url));
    }
    if (!adminRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        `${url.origin}/auth/login?p=${req.nextUrl.pathname}`
      );
    }

    if (!adminRoles.includes(session.user.role)) {
      return NextResponse.redirect(`${url.origin}`);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*"],
};
