const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// base route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// notes API
app.use("/api/notes", noteRoutes);

module.exports = app;
