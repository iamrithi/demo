import { createCanteen, getAllCanteen } from "@/api-middleware/canteen";
import { CanteenSchema } from "@/schemas/index";

//CREATE canteen
export async function POST(req: Request) {
  const data = await req.json(); //body comes from this function;
  const validatedFields = CanteenSchema.safeParse(data);
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
    const canteen = await createCanteen(data);
    return Response.json(
      {
        success: true,
        data: canteen,
        message: "canteen created successfully",
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

//GET ALL canteen

export async function GET(req: Request) {
  try {
    const canteens = await getAllCanteen();
    return Response.json({ success: true, data: canteens });
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
