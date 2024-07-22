/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_csd_id_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_CanteenToInventory" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CanteenToInventory_AB_unique" ON "_CanteenToInventory"("A", "B");

-- CreateIndex
CREATE INDEX "_CanteenToInventory_B_index" ON "_CanteenToInventory"("B");

-- AddForeignKey
ALTER TABLE "_CanteenToInventory" ADD CONSTRAINT "_CanteenToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "Canteen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanteenToInventory" ADD CONSTRAINT "_CanteenToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
