import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE grievance
export const createGrievance = async (values: any) => {
  console.log(values);
  return await db.grievance.create({
    data: { ...values },
  });
};
//GET ALL grievance
export const getAllGrievance = async () => {
  return await db.grievance.findMany({
    include: {
      canteen: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
export const grievanceFindByFilterOption = async (data: any) => {
  return await db.grievance.findMany({
    where: data,
  });
};
//GET GrievanceBY ID
export const grievanceFindById = async (id: string) => {
  return await db.grievance.findUnique({
    where: {
      id: id,
    },
    include: {
      canteen: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
//DELETE GrievanceBY NAME

export const grievanceDeleteById = async (id: string) => {
  return await db.grievance.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE GrievanceBY NAME

export const grievanceUpdateById = async (id: string, values: any) => {
  return await db.grievance.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
