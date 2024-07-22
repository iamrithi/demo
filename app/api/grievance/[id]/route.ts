import {
  grievanceDeleteById,
  grievanceFindById,
  grievanceUpdateById,
} from "@/api-middleware/grievanceAction";
import {} from "@/schemas";
import { data } from "autoprefixer";

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  try {
    const findgrievance = await grievanceFindById(id as string);

    if (!findgrievance) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "grievance not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const grievance = findgrievance;

    return Response.json(
      {
        success: true,
        data: grievance,
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
    const findgrievance = await grievanceFindById(id as string);
    if (!findgrievance) {
      return Response.json(
        {
          success: false,
          message: "grievance not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const deletegrievance = await grievanceDeleteById(findgrievance.id);
    return Response.json(
      {
        success: true,
        data: deletegrievance,
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

  // Dont need mandotary check here

  // const validatedFields = grievanceSchema.safeParse(data);
  // if (!validatedFields.success) {
  //   return Response.json(
  //     {
  //       success: false,
  //       data: null,
  //       message: `Missing mandatory fields`,
  //     },
  //     { status: 400 }
  //   );
  // }
  try {
    const findgrievance = await grievanceFindById(id as string);
    if (!findgrievance) {
      return Response.json(
        {
          success: false,
          message: "grievance not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const updategrievance = await grievanceUpdateById(findgrievance.id, data);
    return Response.json(
      {
        success: true,
        data: updategrievance,
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
