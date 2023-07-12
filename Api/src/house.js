const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "HouseImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const handleImageUpload = (req, res, callback) => {
  upload.array("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ Message: "Multer error" });
    } else if (err) {
      return res.status(500).json({ Message: "Internal error " });
    }
    callback();
  });
};

class House {
  static async addHouse(req, res) {
    handleImageUpload(req, res, async () => {
      const files = req.files;

      const {
        name,
        numberOfRooms,
        size,
        descriptions,
        priceOfHouse,
        address,
        phoneNumber,
        email,
      } = req.body;

      const parsedPhoneNumber = phoneNumber.toString();
      const parsedSize = parseInt(size, 10);
      const parsedPriceOfHouse = parseInt(priceOfHouse, 10);
      const parsedNumberOfRooms = parseInt(numberOfRooms, 10);
      try {
        const house = await prisma.house.create({
          data: {
            name,
            numberOfRooms: parsedNumberOfRooms,
            size: parsedSize,
            descriptions,
            priceOfHouse: parsedPriceOfHouse,
            address,
            phoneNumber: parsedPhoneNumber,
            email,
          },
        });
        for (const file of files) {
          await prisma.image.create({
            data: {
              url: file.filename,
              house: {
                connect: { id: house.id },
              },
            },
          });
        }
        return res
          .status(200)
          .json({ Message: "House and images added successfully", house });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ Message: "Error adding house and images" });
      }
    });
  }
  static async updateHouse(req, res) {
    const { id } = req.params;
    const {
      name,
      numberOfRooms,
      size,
      descriptions,
      priceOfHouse,
      address,
      email,
      phoneNumber,
    } = req.body;
    const parsedPhoneNumber = phoneNumber.toString();
    const parsedSize = parseInt(size, 10);
    const parsedPriceOfHouse = parseInt(priceOfHouse, 10);
    const parsedNumberOfRooms = parseInt(numberOfRooms, 10);
    try {
      const house = await prisma.house.update({
        where: { id },
        data: {
          name,
          numberOfRooms: parsedNumberOfRooms,
          size: parsedSize,
          descriptions,
          priceOfHouse: parsedPriceOfHouse,
          address,
          email,
          phoneNumber: parsedPhoneNumber,
        },
      });
      return res
        .status(200)
        .json({ Message: "House updated successfully", house });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Message: "Error adding house and images" });
    }
  }
  static async getHouses(req, res) {
    try {
      const houses = await prisma.house.findMany({
        include: {
          images: true,
        },
      });
      const housesWithImages = houses.map((house) => {
        const houseWithImages = { ...house };
        houseWithImages.images = house.images.map((image) => {
          const imageUrl = `${image.url}`;
          return imageUrl;
        });
        return houseWithImages;
      });
      res.status(200).json(housesWithImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving houses" });
    }
  }
  static async search(req, res) {
    const { query } = req.params;
    const results = await prisma.house.findMany({
      where: {
        name: query ? { contains: query, mode: "insensitive" } : [],
      },
      include: { images: true },
    });
    res.json(results);
  }
  static async filter(req, res) {
    const {
      name,
      sizeMin,
      sizeMax,
      address,
      priceMin,
      priceMax,
      roomsMin,
      roomsMax,
    } = req.body;
    let filteredHouses = await prisma.house.findMany({
      include: { images: true },
    });
    if (sizeMin && sizeMax) {
      const parsedSizeMin = parseInt(sizeMin, 10);
      const parsedSizeMax = parseInt(sizeMax, 10);
      filteredHouses = filteredHouses.filter((house) => {
        const houseSize = parseInt(house.size, 10);
        return houseSize >= parsedSizeMin && houseSize <= parsedSizeMax;
      });
    }
    if (name) {
      filteredHouses = filteredHouses.filter((house) =>
        house.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (address) {
      filteredHouses = filteredHouses.filter((house) =>
        house.address.toLowerCase().includes(address.toLowerCase())
      );
    }
    if (priceMin && priceMax) {
      const parsedPriceMin = parseInt(priceMin, 10);
      const parsedPriceMax = parseInt(priceMax, 10);
      filteredHouses = filteredHouses.filter((house) => {
        const priceOfHouse = parseInt(house.priceOfHouse, 10);
        return priceOfHouse >= parsedPriceMin && priceOfHouse <= parsedPriceMax;
      });
    }
    if (roomsMin && roomsMax) {
      const parsedRoomsMin = parseInt(roomsMin, 10);
      const parsedRoomsMax = parseInt(roomsMax, 10);
      filteredHouses = filteredHouses.filter((house) => {
        const numberOfRooms = parseInt(house.numberOfRooms, 10);
        return (
          numberOfRooms >= parsedRoomsMin && numberOfRooms <= parsedRoomsMax
        );
      });
    }

    res.json(filteredHouses);
  }
  static async getHouseById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json("Not Found");
    }

    const singleHouse = await prisma.house.findUnique({
      where: { id },
      include: { images: { select: { url: true } } },
    });

    const imageUrls = singleHouse.images.map((image) => image.url);
    delete singleHouse.images;
    return res.status(200).json({ ...singleHouse, images: imageUrls });
  }
  static async deleteHouse(req, res) {
    const { id } = req.params;

    try {
      const findHouse = await prisma.house.findUnique({
        where: { id },
        include: { images: true },
      });

      if (!findHouse) {
        return res.status(404).json({ Message: "Not Found" });
      }

      const imageUrls = findHouse.images.map((image) => image.url);
      const imageIds = findHouse.images.map((image) => image.id);

      await prisma.house.delete({
        where: { id },
      });

      imageUrls.forEach((imageUrl) => {
        const imagePath = path.join(__dirname, "..", "HouseImages", imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });

      await prisma.image.deleteMany({
        where: { id: { in: imageIds } },
      });

      return res
        .status(200)
        .json({ Message: "House and images deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ Message: "Error deleting house and images" });
    }
  }
}
module.exports = { House };
