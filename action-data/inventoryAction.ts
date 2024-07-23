"use server"
import { Axios } from "@/lib/axios";
export const getAllInventoryItems = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/stocks/inventory", data);
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response!.data;
  }
};
