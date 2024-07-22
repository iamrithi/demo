import {
  userDeleteById,
  userFindById,
  userUpdateById,
} from "@/api-middleware/userAction";
import { UserSchema } from "@/schemas";
import { data } from "autoprefixer";

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  try {
    const findUser = await userFindById(id as string);

    if (!findUser) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "User not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const user = findUser;
    const { password, ...data } = user;
    return Response.json(
      {
        success: true,
        data: data,
        message: "Data Fetch Successfully",
      },
      { status: 200, statusText: "OK" }
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
        success: false,
        data: null,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;
  try {
    const findUser = await userFindById(id as string);
    if (!findUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const deleteUser = await userDeleteById(findUser.id);
    return Response.json(
      {
        success: true,
        data: deleteUser,
        message: "Data Deleted Successfully",
      },
      { status: 200, statusText: "OK" }
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
        success: false,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
export async function PATCH(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const data = await request.json();
  try {
    const findUser = await userFindById(id as string);
    if (!findUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const updateUser = await userUpdateById(findUser.id, data);
    return Response.json(
      {
        success: true,
        data: updateUser,
        message: "Data Updated Successfully",
      },
      { status: 200, statusText: "OK" }
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
        success: false,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
