"use server"
import { Axios } from "@/lib/axios";
export const getAllDocument = async () => {
  try {
    const axiosResponse = await Axios.get("/document/");
    const allDocument = axiosResponse.data;
    return allDocument;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const getAllDocumentBasedFilter = async (data: any) => {
  try {
    const axiosResponse = await Axios.post("/document/filter", data);
    console.log(data);
    const allDocument = axiosResponse.data;
    return allDocument;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const createDocument = async (data: any) => {
  const formData = new FormData();
  try {
    const axiosResponse = await Axios.post("/document", data, {
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
export const getSingleDocument = async (id: string) => {
  try {
    const axiosResponse = await Axios.get(`/document/${id}`);
    const allDocument = axiosResponse.data;
    return allDocument;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const updateDocument = async (id: string, data: any) => {
  try {
    const axiosResponse = await Axios.patch(`/document/${id}`, data);
    const allDocument = axiosResponse.data;
    return allDocument;
  } catch (error: any) {
    return error?.response!.data;
  }
};
export const deleteDocument = async (id: string) => {
  try {
    const axiosResponse = await Axios.delete(`/document/${id}`);
    const allDocument = axiosResponse.data;
    return allDocument;
  } catch (error: any) {
    return error?.response!.data;
  }
};
