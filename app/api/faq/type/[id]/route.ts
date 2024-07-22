import {
  faqTypeDeleteById,
  faqTypeFindById,
  faqTypeUpdateById,
} from "@/api-middleware/faqTypeAction";
import { FaqSchema } from "@/schemas";
import { data } from "autoprefixer";
interface IParams {
  id: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  try {
    const findFaqType = await faqTypeFindById(id as string);

    if (!findFaqType) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Faq Type not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const user = findFaqType;
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
    const findFaqType = await faqTypeFindById(id as string);
    if (!findFaqType) {
      return Response.json(
        {
          success: false,
          message: "Faq-Type not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const deleteFaq = await faqTypeDeleteById(findFaqType.id);
    return Response.json(
      {
        success: true,
        data: deleteFaq,
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
    const findFaqType = await faqTypeFindById(id as string);
    if (!findFaqType) {
      return Response.json(
        {
          success: false,
          message: "Faq-Type not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const updateFaq = await faqTypeUpdateById(findFaqType.id, data);
    return Response.json(
      {
        success: true,
        data: updateFaq,
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
