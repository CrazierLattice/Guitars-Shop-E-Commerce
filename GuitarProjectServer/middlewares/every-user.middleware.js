const jwt = require("jsonwebtoken");

//Middleware that gives access only to the admin.

const everyUserToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(404).json({ error: true, message: "Token is required" });
  jwt.verify(token, process.env.SECRET_CODE, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    if (decoded.user) return next();
    res
      .status(403)
      .json({ error: true, message: "You dont have access to do that." });
  });
};

module.exports = everyUserToken;
