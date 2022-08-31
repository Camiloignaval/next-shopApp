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

  // -----------------------
  if (!session) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    }

    const requestedPage = req.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/auth/login?p=${requestedPage}`, req.url)
    );
  }

  const validRoles = ["admin"];
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    }
  }
  console.log("voy a continuar");
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
//   const url = req.nextUrl.clone();
//   console.log({ session });

//   if (req.nextUrl.pathname.startsWith("/api/admin")) {
//     console.log("entre a api/admin");
//     if (!session) {
//       console.log("no estoy con sesion");
//       return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url));
//     }
//     if (!adminRoles.includes(session.user.role)) {
//       console.log("no tengo rol");

//       return NextResponse.redirect(new URL(`/api/auth/unauthorized`, req.url));
//     }
//     return NextResponse.next();
//   }
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!session) {
//       return NextResponse.redirect(
//         `${url.origin}/auth/login?p=${req.nextUrl.pathname}`
//       );
//     }

//     if (!adminRoles.includes(session.user.role)) {
//       return NextResponse.redirect(`${url.origin}`);
//     }
//     return NextResponse.next();
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/admin/:path*", "/admin/:path*"],
// };
