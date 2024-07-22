import {
  stockUpdateById,
  stockDeleteById,
  stockFindById,
} from "@/api-middleware/stockAction";

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  try {
    const findCanteen = await stockFindById(id as string);

    if (!findCanteen) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "canteen not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const canteen = findCanteen;
    return Response.json(
      {
        success: true,
        data: canteen,
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
    const findcanteen = await stockFindById(id as string);
    if (!findcanteen) {
      return Response.json(
        {
          success: false,
          message: "canteen not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const deletecanteen = await stockDeleteById(findcanteen.id);
    return Response.json(
      {
        success: true,
        data: deletecanteen,
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
    const findcanteen = await stockFindById(id as string);
    if (!findcanteen) {
      return Response.json(
        {
          success: false,
          message: "canteen not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const updatecanteen = await stockUpdateById(findcanteen.id, data);
    return Response.json(
      {
        success: true,
        data: updatecanteen,
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
