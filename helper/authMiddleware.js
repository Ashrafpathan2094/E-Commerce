const jwt = require("jsonwebtoken");

module.exports = function protect(req, res, next) {
  //check if token in headers
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Access Denied No Token" });
  const token = req.headers.authorization.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token", token: token });
  }
};
