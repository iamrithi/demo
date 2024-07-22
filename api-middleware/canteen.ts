import { db } from "@/lib/db";

// CREATE CANTEEN
export const createCanteen = async (values: any) => {
  return await db.canteen.create({
    data: { ...values },
  });
};
//GET ALL CANTEEN
export const getAllCanteen = async () => {
  return await db.canteen.findMany();
};

export const canteenFindByFilterOption = async (data: any) => {
  return await db.canteen.findMany({
    where: data,
  });
};

export const canteenFindById = async (id: string) => {
  return await db.canteen.findUnique({
    where: {
      id: id,
    },
  });
};
//DELETE CANTEEN BY NAME

export const canteenDeleteById = async (id: string) => {
  return await db.canteen.delete({
    where: {
      id: id,
    },
  });
};
//UPDATE CANTEEN BY NAME

export const canteenUpdateById = async (id: string, values: any) => {
  return await db.canteen.update({
    where: {
      id: id,
    },
    data: { ...values },
  });
};
