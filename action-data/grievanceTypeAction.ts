"use server";

import { Axios } from "@/lib/axios";
import { ResponseData } from "@/types";

export const getAllGrievanceType = async () => {
  try {
    const axiosResponse = await Axios.get("/grievance/type");
    const allGrievanceType = axiosResponse.data;
    return allGrievanceType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createGrievanceType = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/grievance/type", data);
    const allGrievanceType = axiosResponse.data;
    return allGrievanceType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleGrievanceType = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/grievance/type/${id}`);
    const allGrievanceType = axiosResponse.data;
    return allGrievanceType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const updateGrievanceType = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/grievance/type/${id}`, data);
    const allGrievanceType = axiosResponse.data;
    return allGrievanceType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteGrievanceType = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/grievance/type/${id}`);
    const allGrievanceType = axiosResponse.data;
    return allGrievanceType;
  } catch (error: any) {
    return error?.response!.data;
  }
};
