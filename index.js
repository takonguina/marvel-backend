const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

mongoose.connect(process.env.MONGOOSE_URI);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ messahe: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 🚀");
});
