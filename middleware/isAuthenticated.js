const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Missing token" });
  }
};

module.exports = isAuthenticated;
