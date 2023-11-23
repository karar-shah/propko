"use server";
import { SignupSchema } from "@/validation/auth";
import db from "../lib/db";
import { ApiResponse } from "@/typing/api";
import { User } from "@prisma/client";
import { hashPassword } from "../lib/auth";

export async function signup(
  data: Omit<SignupSchema, "confPassword">
): Promise<ApiResponse<User>> {
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
        name: data.name,
        password: hashedPassword,
      },
    });
    if (!user) throw new Error("User not created.");
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
