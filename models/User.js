const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  password: String,
  favorite: [String],
});

module.exports = User;
