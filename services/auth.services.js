require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const md5 = require("md5");

class AuthService {

  static login = async (req) => {
    const db = req.conn;
    const { email, password } = JSON.parse(JSON.stringify(req.body));
    let pass = md5(password);
    const rows = await new Promise((resolve) => {
      db.query(
        `SELECT id,name,email from users where email="${email}" and pass="${pass}"`,
        (err, res) => {
          resolve(res);
          if (err) console.log(err);
        }
      );
    })

    let result = Object.values(JSON.parse(JSON.stringify(rows)));
    if(result.length === 0){
      return { user:"Invalid credentials",status:false }
    }
    const user = result[0];
    console.log(user)
    const accessToken = await jwt.signAccessToken(user);
    return { user:{...user,accessToken},status:true };
  };
}

module.exports = AuthService;
