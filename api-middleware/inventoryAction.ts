import { db } from "@/lib/db";
// GET ALL INVENTORY
export const getAllInventoryItems = async (
  csd_id: string,
  stock_id: string
) => {
  return await db.inventory.findMany({
    where: {
      stock_id: stock_id,
      csd_id: csd_id,
    },
  });
};
export const getAllInventory = async () => {
  return await db.inventory.findMany();
};
