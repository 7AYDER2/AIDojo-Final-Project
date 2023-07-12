const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "usersImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const handleImageUpload = (req, res, callback) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ Message: "Multer error" });
    } else
      (err) => {
        return res.status(500).json({ Message: "Internal error" });
      };
    callback();
  });
};

class Profile {
  static async getProfile(req, res) {
    const { userId } = req.payload;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        image: true,
        registrationDate: true,
      },
    });
    return res.status(200).json({ Profile: user });
  }
  static async updateProfile(req, res) {
    handleImageUpload(req, res, async () => {
      const file = req.file;
      const { userName } = req.body;
      const { userId } = req.payload;
      let data = {};

      if (userName) {
        const userByUserName = await prisma.user.findUnique({
          where: {
            userName: userName,
          },
          select: { userName: true },
        });

        if (userByUserName) {
          return res.status(400).json({ Message: "Username already used" });
        }

        data.userName = userName;
      }

      const oldImage = await prisma.user.findUnique({
        where: { id: userId },
        select: { image: true },
      });

      let image;
      if (file) {
        // Delete old image file
        if (oldImage && oldImage.image) {
          fs.unlinkSync(`usersImages/${oldImage.image}`);
        }
        image = file.filename;
      } else {
        image = oldImage.image;
      }

      data.image = image;

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: data,
        select: {
          userName: true,
          image: true,
        },
      });

      return res
        .status(200)
        .json({ Message: "Profile updated successfully", Profile: user });
    });
  }
}
module.exports = { Profile };
