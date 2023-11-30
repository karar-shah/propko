import { IProperty } from "@/server/lib/db/schemas/properties";
import { ApiResponse } from "@/typing/api";
import axios from "axios";

export async function saveData(
  data: IListingData
): Promise<ApiResponse<IProperty>> {
  try {
    const res = await axios.post<ApiResponse<IProperty>>("/api/listing", data);
    return res.data;
  } catch (error) {
    return {
      succeed: false,
      code: "UNKOWN_ERROR",
    };
  }
}
