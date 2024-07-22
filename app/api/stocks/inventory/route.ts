import {
  getAllInventory,
  getAllInventoryItems,
} from "@/api-middleware/inventoryAction";
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const inventoryItems = await getAllInventoryItems(
      data.csd_id,
      data.stock_id
    );
    return Response.json({
      success: true,
      data: inventoryItems,
      menubar: "Data Fetched SuccessFully",
    });
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
export async function GET(req: Request) {
  try {
    const inventory = await getAllInventory();
    return Response.json({ success: true, data: inventory });
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
