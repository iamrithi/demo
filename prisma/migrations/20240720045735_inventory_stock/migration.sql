/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_csd_id_fkey";

-- DropTable
DROP TABLE "inventory";

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "S_No" INTEGER NOT NULL,
    "Index" TEXT NOT NULL,
    "Pluno" TEXT NOT NULL,
    "Item_Description" TEXT NOT NULL,
    "Stock" INTEGER NOT NULL,
    "W_Rate" DECIMAL(65,30) NOT NULL,
    "W_Amt" DECIMAL(65,30) NOT NULL,
    "R_Rate" DECIMAL(65,30) NOT NULL,
    "R_Amt" DECIMAL(65,30) NOT NULL,
    "VAT_Percent" DECIMAL(65,30) NOT NULL,
    "VAT_WRate" DECIMAL(65,30) NOT NULL,
    "VAT_W_Amt" DECIMAL(65,30) NOT NULL,
    "VAT_Rate" DECIMAL(65,30) NOT NULL,
    "VAT_R_Amt" DECIMAL(65,30) NOT NULL,
    "Profit" DECIMAL(65,30) NOT NULL,
    "MPP" DECIMAL(65,30) NOT NULL,
    "Group_Name" TEXT NOT NULL,
    "csd_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_csd_id_fkey" FOREIGN KEY ("csd_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
