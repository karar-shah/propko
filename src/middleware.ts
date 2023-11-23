import {
  NextMiddlewareWithAuth,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ApiResponse } from "./typing/api";
import { SessionUser } from "./typing/auth";

const unauthorizedRes: ApiResponse<null> = {
  succeed: false,
  code: "UNAUTHORIZED",
};

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const user = (req.nextauth.token as { user: SessionUser | null }).user;
    if (!user) return NextResponse.redirect(new URL("/login", req.url));
  },
  {
    callbacks: {
      authorized: (params) => {
        return !!params.token;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: ["/((?!images|icons|_next/static|_next/image|favicon.ico).*)"],
};
