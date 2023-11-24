"use server";
import { AuthSchema } from "@/validation/auth";
import db from "../lib/db";
import { ApiResponse } from "@/typing/api";
import { User } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import mailer from "../lib/mailer";

export async function signup(data: AuthSchema): Promise<ApiResponse<User>> {
  try {
    const userExist = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (userExist) {
      return {
        succeed: false,
        code: "EMAIL_ALREADY_EXISTS",
      };
    }
    const hashedPassword = await hashPassword(data.password);
    if (!hashedPassword) throw new Error("Password hashing failed");
    const user = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    if (!user) throw new Error("User not created.");
    // Send verification email to user
    await mailer.sendeVerificationEmail(user);
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
