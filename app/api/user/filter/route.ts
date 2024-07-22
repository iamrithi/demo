import {
  createUser,
  getAllUser,
  userFindByFilterOption,
} from "@/api-middleware/userAction";
import { UserSchema } from "@/schemas/index";

//CREATE USER
export async function POST(req: Request) {
  const data = await req.json(); //body comes from this function;
  try {
    const user = await userFindByFilterOption(data);
    return Response.json(
      {
        success: true,
        data: user,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return Response.json(
        {
          success: false,
          data: null,
          message: `${error.meta.target[0]} ${
            data[`${error.meta.target[0]}`]
          } already exists`,
        },
        { status: 409 }
      );
    }
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
        success: false,
        data: null,
        message: `Something went wrong`,
      },
      { status: 500 }
    );
  }
}

//GET ALL USER
