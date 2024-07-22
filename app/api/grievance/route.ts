import {
  createGrievance,
  getAllGrievance,
} from "@/api-middleware/grievanceAction";
import { GrievanceSchema, UserSchema } from "@/schemas/index";

//CREATE USER
export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const validatedFields = GrievanceSchema.safeParse(data);
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
    const user = await createGrievance(data);
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

export async function GET(req: Request) {
  try {
    const users = await getAllGrievance();
    return Response.json({ success: true, data: users });
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
      { success: false, data: null, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
