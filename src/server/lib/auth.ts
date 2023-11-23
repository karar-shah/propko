import { randomBytes, randomUUID } from "crypto";
import { AuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { SessionUser } from "@/typing/next-auth";
import db from "./db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "example@domain.com",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await db.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!user) throw new Error("NOT_FOUND");
        if (!(await comparePassword(password, user.password)))
          throw new Error("WRONG_PASSWORD");
        return { ...user, id: user.id.toString(), password: "" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as SessionUser;
      }
      return session;
    },
  },
};

export async function getServerAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = await db.user.findFirst({
    where: { id: session.user.id },
  });
  if (!user) return false;
  return {
    ...session,
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
    },
  };
}

export async function hashPassword(password: string) {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    return null;
  }
}
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  try {
    return bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    return false;
  }
}
