import { db } from "@/lib/db";

// CREATE CANTEEN
export const createDocuments = async (values: any) => {
  return db.documents.create({
    data: values,
  });
};
//GET ALL CANTEEN
export const getAllDocuments = async () => {
  return await db.documents.findMany();
};

export const documentsFindByFilterOption = async (data: any) => {
  return await db.documents.findMany({
    where: data,
  });
};

export const documentsFindById = async (id: string) => {
  return await db.documents.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE CANTEEN BY NAME

export const documentsDeleteById = async (id: string) => {
  return await db.documents.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE CANTEEN BY NAME

export const documentUpdateById = async (id: string, values: any) => {
  return await db.documents.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
