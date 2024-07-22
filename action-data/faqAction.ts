"use server";

import { Axios } from "@/lib/axios";
import { ResponseData } from "@/types";

export const getAllFaq = async () => {
  try {
    const axiosResponse = await Axios.get("/faq/");
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createFaq = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/faq/", data);
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleFaq = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/faq/${id}`);
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const updateFaq = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/faq/${id}`, data);
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteFaq = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/faq/${id}`);
    const allFaq = axiosResponse.data;
    return allFaq;
  } catch (error: any) {
    return error?.response!.data;
  }
};
