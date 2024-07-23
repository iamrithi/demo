import { db } from "@/lib/db";

// CREATE CANTEEN
export const createStock = async (values: any) => {
  console.log(values);
  return db.stock.create({
    data: values,
  });
};
//GET ALL CANTEEN
export const getAllStock = async () => {
  return await db.stock.findMany({
    include: {
      canteen: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const stockFindByFilterOption = async (data: any) => {
  return await db.stock.findFirst({
    where: data,
    orderBy: {
      date: 'desc',
    }
  });
};

export const stockFindById = async (id: string) => {
  return await db.stock.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE CANTEEN BY NAME

export const stockDeleteById = async (id: string) => {
  return await db.stock.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE CANTEEN BY NAME

export const stockUpdateById = async (id: string, values: any) => {
  return await db.documents.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
