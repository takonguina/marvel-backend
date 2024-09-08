const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json(user.favorite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { thumbnail, _id, name } = req.body.character;
    if (_id && thumbnail && name) {
      const favoriteList = [...req.user.favorite];
      let isDelete = false;
      for (let i = 0; i < favoriteList.length; i++) {
        if (favoriteList[i]._id === _id) {
          favoriteList.splice(i, 1);
          isDelete = true;
          break;
        }
      }
      if (!isDelete) {
        favoriteList.push(req.body.character);
      }
      await User.findByIdAndUpdate(req.user._id, {
        favorite: favoriteList,
        new: true,
      });
      return res.json({
        message: isDelete ? "Remove from favorites" : "Added to favorites",
      });
    } else {
      return res.status(404).json({ message: "Missing id, name or thumbnail" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
