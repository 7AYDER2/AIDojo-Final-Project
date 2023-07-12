-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfRooms" INTEGER NOT NULL,
    "numberOfBathrooms" INTEGER NOT NULL,
    "numberOfKitchens" INTEGER NOT NULL,
    "descriptions" TEXT NOT NULL,
    "priceForRent1Day" DOUBLE PRECISION NOT NULL,
    "priceForRent1Month" DOUBLE PRECISION NOT NULL,
    "priceForRent1Year" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
