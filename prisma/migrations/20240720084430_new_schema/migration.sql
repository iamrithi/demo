/*
  Warnings:

  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CanteenToInventory" DROP CONSTRAINT "_CanteenToInventory_B_fkey";

-- DropTable
DROP TABLE "Inventory";

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "s_no" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "pluno" TEXT NOT NULL,
    "item_description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "w_rate" DECIMAL(65,30) NOT NULL,
    "w_amt" DECIMAL(65,30) NOT NULL,
    "r_rate" DECIMAL(65,30) NOT NULL,
    "r_amt" DECIMAL(65,30) NOT NULL,
    "vat_percent" DECIMAL(65,30) NOT NULL,
    "vat_wrate" DECIMAL(65,30) NOT NULL,
    "vat_w_amt" DECIMAL(65,30) NOT NULL,
    "vat_rate" DECIMAL(65,30) NOT NULL,
    "vat_r_amt" DECIMAL(65,30) NOT NULL,
    "profit" DECIMAL(65,30) NOT NULL,
    "mpp" DECIMAL(65,30) NOT NULL,
    "group_name" TEXT NOT NULL,
    "csd_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_CanteenToInventory" ADD CONSTRAINT "_CanteenToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
