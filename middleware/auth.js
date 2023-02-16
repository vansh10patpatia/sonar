const jwt = require("../utils/jwt");
const createError = require("http-errors");
const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({message:"No header found ",status:false});
    return;
  }
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    res.status(401).send({message:"Access token is required",status:false});
    return;
  }
  await jwt
    .verifyAccessToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(e => {
      console.log(e);
      res.status(401).send({message:"Invalid access token",status:false});
    });
};

module.exports = auth;
