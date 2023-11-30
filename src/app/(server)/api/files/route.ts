import cldClient from "@/server/lib/cloudinary";
import { ApiResponse } from "@/typing/api";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();
    const files = formdata.getAll("files") as File[];
    const uploadedFiles: Array<ICldFile> = [];
    await Promise.all(
      files.map(async (file) => {
        let response = await cldClient.uploadFile(file);
        if (response) {
          uploadedFiles.push({
            publicId: response.public_id,
            url: response.url,
          });
        }
      })
    );

    return NextResponse.json({
      succeed: true,
      data: uploadedFiles,
      code: "SUCCESS",
    } satisfies ApiResponse<ICldFile[]>);
  } catch (error) {
    return NextResponse.json({
      succeed: false,
      code: "UNKOWN_ERROR",
    } satisfies ApiResponse);
  }
};
