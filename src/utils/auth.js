const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("auth.jwt.secret");

const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    var authorization = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(authorization, "secret_key");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({
        status: 401,
        message: "Invalid Token",
      });
    }
    return next();
  } else {
    return res.status(403).send("A token is required for authentication");
  }
};

module.exports = { verifyToken };
