import { AuthType, IUser } from "@/server/lib/db/schemas/users";

type PublicUser = Omit<IUser, "password">;

export type CreateUserParams = {
  email: string;
} & ({ authType: "google" } | { authType: "credentials"; password: string });

declare module "next-auth" {
  interface Session {
    user: PublicUser;
  }
}
