const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(409).json({ message: "Email already registered" });
      } else {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);

        const newUser = new User({
          name: name,
          email: email,
          hash: hash,
          salt: salt,
          token: token,
        });

        await newUser.save();

        res.json({ token: token });
      }
    } else {
      return res.status(404).json({ message: "Missing field(s)" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const salt = user.salt;
        const hash = user.hash;
        const checkHash = SHA256(password + salt).toString(encBase64);
        if (hash === checkHash) {
          return res.json({ token: user.token });
        } else {
          return res.status(401).json({ message: "Wrong password" });
        }
      } else {
        return res.status(404).json({ message: "Email not registered" });
      }
    } else {
      return res.status(404).json({ message: "Missing field(s)" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
