"use server";

import { Axios } from "@/lib/axios";
import { ResponseData } from "@/types";

export const getAllFaqType = async () => {
  try {
    const axiosResponse = await Axios.get("/faq/type/");
    const allFaqType = axiosResponse.data;
    return allFaqType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createFaqType = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/faq/type/", data);
    const allFaqType = axiosResponse.data;
    return allFaqType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleFaqType = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/faq/type/${id}`);
    const allFaqType = axiosResponse.data;
    return allFaqType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const updateFaqType = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/faq/type/${id}`, data);
    const allFaqType = axiosResponse.data;
    return allFaqType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteFaqType = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/faq/type/${id}`);
    const allFaqType = axiosResponse.data;
    return allFaqType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
