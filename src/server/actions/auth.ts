"use server";
import { AuthSchema, ResetPasswordSchema } from "@/validation/auth";
import { hashPassword } from "../lib/auth";
import withMongoose, { db } from "../lib/db";
import mailer from "../lib/mailer";
import jwt from "../lib/jwt";

export const sendeVerificationEmail = mailer.sendeVerificationEmail;
export const sendeResetPasswordEmail = mailer.sendeResetPasswordEmail;

export const signup = withMongoose(async (data: AuthSchema) => {
  try {
    const userExist = await db.User.getUserByEmail(data.email);
    if (userExist) {
      return {
        succeed: false,
        code: "EMAIL_ALREADY_EXISTS",
      };
    }
    const hashedPassword = await hashPassword(data.password);
    if (!hashedPassword) throw new Error("Password hashing failed");
    const user = await db.User.createUser({
      authType: "credentials",
      email: data.email,
      password: hashedPassword,
    });
    if (!user) throw new Error("User not created.");
    await sendeVerificationEmail(user);
    return {
      succeed: true,
      code: "SUCCESS",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
});

export const updatePassword = withMongoose(
  async (token: string, password: string) => {
    try {
      const payload = await jwt.verifyToken(token);
      if (!payload) {
        return {
          succeed: false,
          code: "EXPIRED",
        };
      }
      const user = await db.User.getUserById(payload.userId);
      if (!user) {
        return {
          succeed: false,
          code: "EXPIRED",
        };
      }
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) throw new Error("Password hashing failed");
      await db.User.updateOne(
        { id: payload.userId },
        { password: hashedPassword }
      );
      return {
        succeed: true,
        code: "SUCCESS",
        data: user,
      };
    } catch (error) {
      console.log(error);
      return {
        succeed: false,
        code: "UNKOWN_ERROR",
      };
    }
  }
);

export const resetPassword = async (data: ResetPasswordSchema) => {
  try {
    const user = await db.User.getUserByEmail(data.email);
    if (!user) {
      return {
        succeed: false,
        code: "NOT_FOUND",
      };
    }
    await sendeResetPasswordEmail(user);
    return {
      succeed: true,
      code: "SUCCESS",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
};
