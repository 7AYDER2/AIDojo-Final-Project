-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_houseId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "houseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
