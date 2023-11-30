import { ApiResponse, IChangePassword } from "@/typing/api";
import axiosClient from "../axios";

export async function uploadFiles(
  files: Blob[]
): Promise<ApiResponse<ICldFile[]>> {
  try {
    const formdata = new FormData();
    files.forEach((file) => {
      formdata.append("files", file);
    });
    const res = await axiosClient.post<ApiResponse<ICldFile[]>>(
      "/api/files",
      formdata
    );
    console.log(res);
    return res.data;
  } catch (error) {
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
}

export async function uploadFile(file: Blob): Promise<ApiResponse<ICldFile>> {
  const res = await uploadFiles([file]);
  const resFile = res.data?.at(0);
  if (res.succeed && resFile) {
    return {
      succeed: true,
      data: resFile,
      code: res.code,
    };
  } else {
    return {
      succeed: false,
      code: res.code || "UNKOWN_ERROR",
    };
  }
}
