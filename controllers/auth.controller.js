const auth = require("../services/auth.services");
const middleware = require("../middleware/auth")

class AuthController {
  
  static login = async (req, res, next) => {
    try {
      const data = await auth.login(req);
      res.status(200).json({
        status:data.status,
        data: data.user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };


}

module.exports = AuthController;
