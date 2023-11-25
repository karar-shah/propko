import { IUser } from "@/server/lib/db/schemas/users";

type SessionUser = Omit<IUser, "password">;

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}



