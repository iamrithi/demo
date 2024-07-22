
import { userFindById, userFindByUserEmail } from "@/api-middleware/userAction";
import { deleteOtpWithToken, otpVerify } from "@/api-middleware/otpAction";
import { verifyOtpWithToken } from "@/api-middleware/otpAction";
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const otpData = await verifyOtpWithToken(data.otpId!);
    if (!otpData) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `Invalid OTP`,
        },
        { status: 401 }
      );
    }
    const hasExpired = new Date(otpData.expiration) < new Date();
    if (hasExpired) {
      return Response.json(
        {
          success: true,
          data: null,
          message: `OTP has expired!`,
        },
        { status: 502 }
      );
    }
    const optMatch = await otpVerify(data.otp, otpData.token);
    if (!optMatch) {
      return Response.json(
        {
          success: true,
          data: null,
          message: `Otp does not match`,
        },
        { status: 502 }
      );
    }
    const findUser = await userFindById(otpData.user_id);
    // const deleteOtp = await deleteOtpWithToken(otpData.user_id);
    if (!findUser) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `User not found!`,
        },
        { status: 404 }
      );
    }
    const { password: passwordData, ...user } = findUser;

    return Response.json(
      {
        success: true,
        data: user,
        message: "Loged In",
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
        success: true,
        data: null,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
