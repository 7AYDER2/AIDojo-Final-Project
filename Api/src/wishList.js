const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class WishList {
  static async addToWishListById(req, res) {
    const { houseId } = req.params;
    const { userId } = req.payload;
    try {
      if (!houseId) {
        return res.status(400).json("Not Found");
      }
      const findWishListHouse = await prisma.wishList.findMany({
        where: { houseId },
      });
      if (findWishListHouse.length > 0) {
        return res
          .status(200)
          .json({ Message: "The House already added to the wishlist" });
      }
      await prisma.wishList.create({
        data: {
          userId,
          houseId,
        },
      });
      return res.status(200).json({ Message: " House added to the wishlist" });
    } catch (error) {
      console.log(error);
    }
  }
  static async getWishList(req, res) {
    const { userId } = req.payload;
    const wishList = await prisma.wishList.findMany({
      where: { userId },
      include: { house: { include: { images: { select: { url: true } } } } },
    });
    const updatedWishList = wishList.map((item) => {
      const house = { ...item.house };
      const imageUrls = house.images.map((image) => image.url);
      delete house.images;
      return { ...item, house: { ...house, images: imageUrls } };
    });

    return res.status(200).json({ wishList: updatedWishList });
  }
  static async deleteHouseFromWishList(req, res) {
    const { id } = req.params;
    await prisma.wishList.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ Message: "House Removed From The WishList " });
  }
}
module.exports = { WishList };
