/*
  Warnings:

  - You are about to drop the column `numberOfBathrooms` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfKitchens` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `priceForRent1Day` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `priceForRent1Month` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `priceForRent1Year` on the `House` table. All the data in the column will be lost.
  - Added the required column `priceOfHouse` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "numberOfBathrooms",
DROP COLUMN "numberOfKitchens",
DROP COLUMN "priceForRent1Day",
DROP COLUMN "priceForRent1Month",
DROP COLUMN "priceForRent1Year",
ADD COLUMN     "priceOfHouse" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
