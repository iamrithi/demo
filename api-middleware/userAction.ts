import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE USER
export const createUser = async (values: any) => {
  const { password, ...data } = values;
  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.user.create({
    data: { ...values, password: hashedPassword },
  });
};
//GET ALL USER
export const getAllUser = async () => {
  return await db.user.findMany({
    include: {
      canteen: {
        select: {
          id: true,
          name: true,
        },
      },
      manage_canteen: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const userFindByFilterOption = async (data: any) => {
  return await db.user.findMany({
    where: data,
    include: {
      canteen: true,
    },
  });
};

//GET USER BY NAME
export const userFindByUserEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      canteen: true,
      manage_canteen: true,
    },
  });
};
//GET USER BY ID

export const userFindById = async (id: string) => {
  console.log(id)
  return await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      canteen: true,
      manage_canteen: true,
    },
  });
};
//DELETE USER BY NAME

export const userDeleteById = async (id: string) => {
  return await db.user.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE USER BY NAME
export const userUpdateById = async (id: string, values: any) => {
  const { password, ...data } = values;
  if (password.trim() === "") {
    delete values.password;
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    values.password = hashedPassword;
  }
  return await db.user.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
