import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";
import aws from "aws-sdk";
// CREATE USER
export const sentOtpViaSMS = async (phone_no: string, otp: string) => {
  const params = {
    Message: `Veterans Outreach: Use {{ ${otp} }} to complete your login. This code will expire in 10 minutes.
`,
    PhoneNumber: phone_no,
  };
  const sns = new aws.SNS({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    apiVersion: "2010-03-31",
    region: "ap-south-1",
  })
    .publish(params)
    .promise();
  try {
    return await sns;
  } catch (error) {}
};
export const createOtp = async (payload: any) => {
  const data = await db.otpToken.create({
    data: payload,
  });
  return data;
};

export const verifyOtpAvail = async (id: string) => {
  const data = await db.otpToken.findUnique({
    where: {
      user_id: id,
    },
  });
  return data;
};
export const verifyOtpWithToken = async (id: string) => {
  const findOtpId = await db.otpToken.findUnique({
    where: {
      id: id,
    },
  });
  return findOtpId;
};
export const deleteOtpWithToken = async (id: string) => {
  const findOtpId = await db.otpToken.delete({
    where: {
      id: id,
    },
  });
  return findOtpId;
};
export const otpVerify = async (otp: string, token: string) => {
  const otpMatch = await bcrypt.compare(otp, token);
  return otpMatch;
};
