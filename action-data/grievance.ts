"use server";

import { Axios } from "@/lib/axios";
import { ResponseData } from "@/types";

export const getAllGrievance = async () => {
  try {
    const axiosResponse = await Axios.get("/grievance/");
    const allGrievance = axiosResponse.data;
    return allGrievance;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createGrievance = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/grievance/", data);
    const allGrievance = axiosResponse.data;
    return allGrievance;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getSingleGrievance = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/grievance/${id}`);
    const allGrievance = axiosResponse.data;
    return allGrievance;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const updateGrievance = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/grievance/${id}`, data);
    const allGrievance = axiosResponse.data;
    return allGrievance;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteGrievance = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/grievance/${id}`);
    const allGrievance = axiosResponse.data;
    return allGrievance;
  } catch (error: any) {
    return error?.response!.data;
  }
};
