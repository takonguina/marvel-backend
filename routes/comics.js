const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
