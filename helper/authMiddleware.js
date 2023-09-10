const jwt = require("jsonwebtoken");

module.exports = function protect(req, res, next) {
  //check if token in headers
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Access Denied No Token" });
  const token = req.headers.authorization.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    const url = req.originalUrl;

    //check if user role and route is admin
    if (url.includes("admin")) {
      if (verified.role === "admin") {
        return next();
      } else {
        return res
          .status(400)
          .json({ message: "Invalid Token No Admin Access", token: token });
      }
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", token: token });
  }
};
