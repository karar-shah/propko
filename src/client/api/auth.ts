import { ApiResponse, IChangePassword } from "@/typing/api";
import axios from "axios";

export async function changePassword(
  body: IChangePassword
): Promise<ApiResponse<any>> {
  try {
    const res = await axios.post<ApiResponse>(
      "/api/auth/change-password",
      body
    );
    return res.data;
  } catch (error) {
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
}
