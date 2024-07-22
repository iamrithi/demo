import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE grievanceType
export const createGrievanceType = async (values: any) => {
  return await db.grievanceType.create({
    data: { ...values },
  });
};
//GET ALL grievanceType
export const getAllGrievanceType = async () => {
  return await db.grievanceType.findMany();
};
export const grievanceTypeFindByFilterOption = async (data: any) => {
  return await db.grievanceType.findMany({
    where: data,
  });
};
//GET GrievanceTypeBY ID
export const grievanceTypeFindById = async (id: string) => {
  return await db.grievanceType.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE GrievanceTypeBY NAME

export const grievanceTypeDeleteById = async (id: string) => {
  return await db.grievanceType.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE GrievanceTypeBY NAME

export const grievanceTypeUpdateById = async (id: string, values: any) => {
  return await db.grievanceType.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
