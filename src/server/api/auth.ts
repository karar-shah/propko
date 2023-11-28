import { ApiResponse, IChangePassword } from "@/typing/api";
import { comparePassword, getServerAuth, hashPassword } from "../lib/auth";
import { db } from "../lib/db";
import jwt from "../lib/jwt";

export async function changePassword(
  body: IChangePassword
): Promise<ApiResponse<any>> {
  const session = await getServerAuth();
  if (!session?.user) {
    return {
      succeed: false,
      code: "UNAUTHORIZED",
    };
  }
  try {
    const user = (await db.User.findOne({ id: session.user.id }))?.toObject();
    if (!user) throw new Error("User not found");
    if (user.authType !== "credentials") {
      throw new Error("Using google auth, password cannot be changed.");
    }
    if (body.type === "password") {
      const passwordMatched = comparePassword(
        body.currentPassword,
        user.password
      );
      if (!passwordMatched) {
        return {
          succeed: false,
          code: "WRONG_PASSWORD",
        };
      }
      const hashedPassword = await hashPassword(body.newPassword);
      if (!hashedPassword) throw new Error("Failed hashing password");
      await db.User.updateOne({ id: user.id }, { password: hashedPassword });
      return {
        succeed: true,
        data: {},
        code: "SUCCESS",
      };
    } else if (body.type === "token") {
      const payload = await jwt.verifyToken(body.token);
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
      const hashedPassword = await hashPassword(body.password);
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
    } else {
      throw new Error("Unknown type");
    }
  } catch (error) {
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
}
