class Errors {
  static async signUp(req, res, next) {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      const errorMessage = {
        Message: "Please provide userName, email, password  as JSON",
        Example: {
          userName: "Jhon",
          email: "example@gmail.com",
          password: "password",
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
  static async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      const errorMessage = {
        Message: "Please provide email, password  as JSON",
        Example: {
          email: "example@gmail.com",
          password: "password",
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}
module.exports = { Errors };
