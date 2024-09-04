const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const router = express.Router();
const User = require("../models/User");

router.get("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      console.log("Ok");
      //   const checkUser = await User.findOne({ email });
      //   if (checkUser) {
      //     res.status(409).json({ message: "Email already registered" });
      //   } else {
      //     const salt = uid2(16);
      //   }
      res.json("Good");
    } else {
      res.status(404).json({ message: "Missing field(s)" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
