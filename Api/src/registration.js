const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secertkey = process.env.SECERT_KEY;

class Register {
  static async signup(req, res) {
    const { userName, email, password } = req.body;
    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const userByUserName = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (userByUserName) {
      return res.status(400).json({ Message: "Username already exists" });
    }

    if (userByEmail) {
      return res.status(400).json({ Message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPassword,
      },
    });
    return res.status(200).json({ Message: "User created successfuly" });
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ Message: "Invalid email" });
    }
    try {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res.status(400).json({ Message: "Invalid password" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
          Role: user.role,
        },
        secertkey,
        { expiresIn: "7d" }
      );
      return res
        .status(200)
        .json({ Message: "login successfuly", token, Role: user.role });
    } catch (error) {
      console.log(error);
      return res.json({ Message: "internal error" });
    }
  }
  static async checklogin(req, res, next) {
    const headers = req.headers.authorization;
    if (!headers) {
      return res
        .status(400)
        .json({ message: "please put the token in the headers as Bearer" });
    }
    if (headers) {
      const [bearer, token] = headers.split(" ");
      try {
        const payload = jwt.verify(token, process.env.SECERT_KEY);
        req.payload = payload;
        return next();
      } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
      }
    }

    return res.status(400).json({ message: "Unauthorized" });
  }
  static async role(req, res, next) {
    const { Role } = req.payload;
    if (Role === "user") {
      return res
        .status(404)
        .json({ Message: "permission denied you can't access this end-point" });
    }
    next();
  }
}

module.exports = {
  Register,
};
