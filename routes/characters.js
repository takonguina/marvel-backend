const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { name, skip, limit } = req.body;

    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.API_KEY
      }${limit ? `&limit=${limit}` : ""}${name ? `&name=${name}` : ""}${
        skip ? `&skip=${skip}` : ""
      }`
    );

    res.json(characters.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const character = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}`
    );
    console.log(character.data);
    res.json(character.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
