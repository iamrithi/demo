import { Axios } from "@/lib/axios";
export const getAllStock = async () => {
  try {
    const axiosResponse = await Axios.get("/stocks/");
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getAllStockBasedFilter = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/stocks/filter", data);
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createStock = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/stocks", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleStock = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/stocks/${id}`);
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const updateStock = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/stocks/${id}`, data);
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteStock = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/stocks/${id}`);
    const allStock = axiosResponse.data;
    return allStock;
  } catch (error: any) {
    return error?.response!.data;
  }
};
