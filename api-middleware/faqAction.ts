import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE USER
export const createFaq = async (values: any) => {
  return await db.faq.create({
    data: { ...values },
  });
};
//GET ALL USER
export const getAllFaq = async () => {
  return await db.faq.findMany({
    include: {
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

//GET USER BY ID
export const faqFindById = async (id: string) => {
  return await db.faq.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE USER BY NAME

export const faqDeleteById = async (id: string) => {
  return await db.faq.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE USER BY NAME
export const faqUpdateById = async (id: string, values: any) => {
  return await db.faq.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
