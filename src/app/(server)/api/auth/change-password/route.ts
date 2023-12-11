import apiServer from "@/server/api";
import { connectMongoose } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoose();
  const response = await apiServer.auth.changePassword(await req.json());
  return NextResponse.json(response);
};
