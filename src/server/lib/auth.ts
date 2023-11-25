import { randomBytes, randomUUID } from "crypto";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { SessionUser } from "@/typing/auth";
import withMongoose, { db } from "./db";
import { ApiResCode } from "@/typing/api";

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
      authorize: withMongoose(async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await db.User.findOne({
          email: email,
        }).then((_user) => _user?.toObject());
        if (!user) throw new Error(JSON.stringify({ code: "NOT_FOUND" }));
        if (!(await comparePassword(password, user.password))) {
          throw new Error(JSON.stringify({ code: "WRONG_PASSWORD" }));
        }
        if (!user.emailVerified) {
          throw new Error(
            JSON.stringify({ code: "EMAIL_NOT_VERIFIED", data: user.id })
          );
        }
        return {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
        } as any;
      }),
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin",
    newUser: "/signup",
  },
  // secret: process.env.NEXTAUTH_SECRET as string,
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
  return await getServerSession(authOptions);
}

export async function hashPassword(password: string) {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
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
