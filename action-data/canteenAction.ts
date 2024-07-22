"use server";
import { Axios } from "@/lib/axios";
export const getAllCanteen = async () => {
  try {
    const axiosResponse = await Axios.get("/canteen/");
    const allCanteen = axiosResponse.data;
    return allCanteen;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createCanteen = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/canteen/", data);
    const allCanteen = axiosResponse.data;
    return allCanteen;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleCanteen = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/canteen/${id}`);
    const allCanteen = axiosResponse.data;
    return allCanteen;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const updateCanteen = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/canteen/${id}`, data);
    const allCanteen = axiosResponse.data;
    return allCanteen;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteCanteen = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/canteen/${id}`);
    const allCanteen = axiosResponse.data;
    return allCanteen;
  } catch (error: any) {
    return error?.response!.data;
  }
};
