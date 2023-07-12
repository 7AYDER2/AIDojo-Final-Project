const express = require("express");
const app = express();
const cors = require("cors");
const { Register } = require("./registration");
const { Errors } = require("../inputErrors/register");
const { HouseErrors } = require("../inputErrors/house");
const { House } = require("../src/house");
const { Profile } = require("../src/profile");
const { WishList } = require("../src/wishList");
const Port = 3000;

app.use("/images", express.static((__dirname, "..", "HouseImages")));
app.use("/usersImages", express.static((__dirname, "..", "usersImages")));
app.use(cors());
app.use(express.json());

app.post("/signup", Errors.signUp, Register.signup);

app.post("/login", Errors.login, Register.login);

app.get("/home", House.getHouses);
app.get("/home/:id", House.getHouseById);

app.post("/add-house", Register.checklogin, Register.role, House.addHouse);

app.post(
  "/update-house/:id",
  Register.checklogin,
  Register.role,
  HouseErrors.updateHouse,
  House.updateHouse
);

app.get("/user", Register.checklogin, Profile.getProfile);

app.post("/update-user", Register.checklogin, Profile.updateProfile);

app.get("/search/:query", House.search);

app.get("/filter", House.filter);

app.post("/wishlist/:houseId", Register.checklogin, WishList.addToWishListById);

app.get("/wishlist", Register.checklogin, WishList.getWishList);

app.delete(
  "/wishlist/remove/:id",
  Register.checklogin,
  WishList.deleteHouseFromWishList
);

app.delete(
  "/delete-house/:id",
  Register.checklogin,
  Register.role,
  House.deleteHouse
);
app.listen(Port, () => {
  console.log(`app listening on port ${Port}`);
});
