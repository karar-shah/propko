import { randomBytes, randomUUID } from "crypto";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PublicUser } from "@/typing/auth";
import withMongoose, { connectMongoose, db } from "./db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string,
      // authorization: {
      //   params: {
      //     scope: ""
      //   }
      // }
    }),
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
      authorize: async (credentials) => {
        await connectMongoose();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await db.User.getUserByEmailWPwd(email);
        if (!user) throw new Error(JSON.stringify({ code: "NOT_FOUND" }));
        if (user?.authType === "credentials") {
          if (!(await comparePassword(password, user.password))) {
            throw new Error(JSON.stringify({ code: "WRONG_PASSWORD" }));
          }
          if (!user.emailVerified) {
            throw new Error(
              JSON.stringify({ code: "EMAIL_NOT_VERIFIED", data: user.id })
            );
          }
        }
        return {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          authType: user.authType,
        } as PublicUser;
      },
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
    async signIn({ user, account }) {
      // console.log("User", user);
      // console.log("Account", account);
      if (!user.email) return false;

      const existingUser = await db.User.getUserByEmail(user.email);
      if (!existingUser) {
        const createdUser = await db.User.createUser({
          authType: "google",
          email: user.email,
        });
        if (!createdUser) throw new Error("Internal Server Error");
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as PublicUser;
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
