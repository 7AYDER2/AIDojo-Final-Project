-- CreateTable
CREATE TABLE "wishList" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "houseId" TEXT,

    CONSTRAINT "wishList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishList" ADD CONSTRAINT "wishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishList" ADD CONSTRAINT "wishList_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;
