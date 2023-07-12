/*
  Warnings:

  - A unique constraint covering the columns `[houseId]` on the table `wishList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishList_houseId_key" ON "wishList"("houseId");
