/*
  Warnings:

  - You are about to drop the column `type_id` on the `Grievance` table. All the data in the column will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Grievance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grievance" DROP CONSTRAINT "Grievance_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_csd_id_fkey";

-- AlterTable
ALTER TABLE "Grievance" DROP COLUMN "type_id",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Inventory";

-- CreateTable
CREATE TABLE "inventory" (
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

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_csd_id_fkey" FOREIGN KEY ("csd_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
