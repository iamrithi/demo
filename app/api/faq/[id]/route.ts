import {
  faqDeleteById,
  faqFindById,
  faqUpdateById,
} from "@/api-middleware/faqAction";
import { FaqSchema } from "@/schemas";
import { data } from "autoprefixer";

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  try {
    const findFaq = await faqFindById(id as string);

    if (!findFaq) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Faq not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const user = findFaq;
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
    const findFaq = await faqFindById(id as string);
    if (!findFaq) {
      return Response.json(
        {
          success: false,
          message: "Faq not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const deleteFaq = await faqDeleteById(findFaq.id);
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
    const findFaq = await faqFindById(id as string);
    if (!findFaq) {
      return Response.json(
        {
          success: false,
          message: "Faq not found",
        },
        { status: 404, statusText: "Not Found" }
      );
    }
    const updateFaq = await faqUpdateById(findFaq.id, data);
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
