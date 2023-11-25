import withMongoose, { db } from "@/server/lib/db";
import jwt from "@/server/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = withMongoose(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  if (!token) {
    return new NextResponse("Token Null or Expired.");
  }
  const payload = await jwt.verifyToken(token);
  if (!payload) {
    return new NextResponse("Token Null or Expired.");
  }
  const user = (
    await db.User.findOne({
      id: payload.userId,
    })
  )?.toObject();
  if (!user) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
  await db.User.updateOne({ id: payload.userId }, { emailVerified: true });
  return NextResponse.redirect(
    new URL(`/signup/verification?token=${token}`, req.url)
  );
});
