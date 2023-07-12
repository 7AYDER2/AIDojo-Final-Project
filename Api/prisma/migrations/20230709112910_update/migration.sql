/*
  Warnings:

  - Changed the type of `numberOfRooms` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priceOfHouse` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "numberOfRooms",
ADD COLUMN     "numberOfRooms" INTEGER NOT NULL,
DROP COLUMN "priceOfHouse",
ADD COLUMN     "priceOfHouse" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;
