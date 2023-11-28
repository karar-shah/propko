import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ApiResponse } from "./typing/api";
import { PublicUser } from "./typing/auth";

const unauthorizedRes: ApiResponse<null> = {
  succeed: false,
  code: "UNAUTHORIZED",
};

// export default function middleware() {

// }

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const user = (req.nextauth.token as { user: PublicUser | null }).user;
    if (!user) return NextResponse.redirect(new URL("/signin", req.url));
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
  matcher: [
    "/((?!api/auth|verify-email|signup|reset-password|images|icons|_next/static|_next/image|favicon.ico).*)",
  ],
};
