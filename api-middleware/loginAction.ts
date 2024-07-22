import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

// CREATE USER
export const loginWithPhone = async (values: any) => {
  const data = await db.user.findUnique({
    where: {
      phone_no: values.phone_no,
    },
    include: {
      canteen: true,
      manage_canteen: true,
    },
  });
  return data;
};

export const passwordVerify = async (
  password: string,
  hasedPassword: string
) => {
  const passwordsMatch = await bcrypt.compare(password, hasedPassword);
  return passwordsMatch;
};
