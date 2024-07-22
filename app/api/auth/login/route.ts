
import { userFindByUserEmail } from "@/api-middleware/userAction";
import { passwordVerify } from "@/api-middleware/loginAction";
import { credentialLoginSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data)
    const validatedFields = credentialLoginSchema.safeParse(data);
    if (!validatedFields.success) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `Enter a valid credential`,
        },
        { status: 400 }
      );
    }
    const { password, email } = validatedFields.data;
    const findUser = await userFindByUserEmail(email);
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
    const passwordsMatch = await passwordVerify(password, findUser?.password!);
    if (!passwordsMatch) {
      return Response.json(
        {
          success: false,
          data: null,
          message: `Password does not match!`,
        },
        { status: 401 }
      );
    }
    const role = findUser?.role;
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
      !findUser.manage_canteen
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
      !findUser.canteen
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
