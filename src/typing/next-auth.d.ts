import type { User } from "@prisma/client";

type SessionUser = Omit<User, "password">;

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
