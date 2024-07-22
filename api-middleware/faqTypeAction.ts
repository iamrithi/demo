import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE USER
export const createFaqType = async (values: any) => {
  return await db.faqType.create({
    data: { ...values },
  });
};
//GET ALL USER
export const getAllFaqType = async () => {
  return await db.faqType.findMany({
    include: {
      faqs: true,
    },
  });
};

//GET USER BY ID
export const faqTypeFindById = async (id: string) => {
  return await db.faqType.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE USER BY NAME

export const faqTypeDeleteById = async (id: string) => {
  return await db.faqType.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE USER BY NAME
export const faqTypeUpdateById = async (id: string, values: any) => {
  return await db.faqType.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
