const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routers
const authRoutes = require("./routes/auth");
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");

mongoose.connect(process.env.MONGOOSE_URI);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/comics", comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
