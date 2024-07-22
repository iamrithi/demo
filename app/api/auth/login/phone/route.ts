import { loginWithPhone } from "@/api-middleware/loginAction";
import { phoneLoginSchema } from "@/schemas/index";
import otpGenerator from "otp-generator";
import * as bcrypt from "bcryptjs";
import {
  createOtp,
  deleteOtpWithToken,
  sentOtpViaSMS,
  verifyOtpAvail,
} from "@/api-middleware/otpAction";

//CREATE USER
export async function POST(req: Request) {
  const data = await req.json(); //body comes from this function;
  const validatedFields = phoneLoginSchema.safeParse(data);
  if (!validatedFields.success) {
    return Response.json(
      {
        success: false,
        data: null,
        message: `Missing mandatory fields`,
      },
      { status: 400 }
    );
  }
  try {
    const user = await loginWithPhone(data);
    console.log(user);
    if (!user) {
      return Response.json(
        {
          success: false,
          data: user,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    const role = user?.role;
    if (role.length === 1 && role.includes("USER")) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `You do not have access for this login`,
        },
        { status: 401 }
      );
    }
    if (
      !role.includes("ADMIN") &&
      role.includes("MANAGER") &&
      !user.manage_canteen
    ) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `You do not have an associated canteen to access the Manager Dashboard. Please contact your system administrator for assistance.`,
        },
        { status: 401 }
      );
    }
    if (
      !role.includes("ADMIN") &&
      !role.includes("MANAGER") &&
      role.includes("STAFF") &&
      !user?.canteen
    ) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `You do not have an associated canteen to access the Staff Dashboard. Please contact your system administrator for assistance.`,
        },
        { status: 401 }
      );
    }

    const checkOtp = await verifyOtpAvail(user.id);
    if (checkOtp) {
      const removeOtp = await deleteOtpWithToken(checkOtp.id);
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });
    const hashedOtp = await bcrypt.hash(otp, 10);
    const message = "Login to Veteran Outreach App";
    const expiration: number = Date.now() + 60 * 1000;
    const sentOtp = await sentOtpViaSMS(`+91${user.phone_no}`, otp);
    if (!sentOtp) {
      return Response.json(
        {
          success: true,
          data: null,
          message: "OTP not generated",
        },
        { status: 201 }
      );
    }
    const newOtp = await createOtp({
      token: hashedOtp,
      user_id: user.id,
      expiration: new Date(expiration),
    });
    console.log(newOtp);
    return Response.json(
      {
        success: true,
        data: newOtp,
        message: "OTP sent to the mobile number",
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P1001") {
      return Response.json(
        {
          success: false,
          data: null,
          message: `Network error`,
        },
        { status: 502 }
      );
    }
    console.log(error);
    return Response.json(
      {
        success: false,
        data: null,
        message: `Something went wrong`,
      },
      { status: 500 }
    );
  }
}

//GET ALL USER
