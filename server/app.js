const express = require("express");
const cors = require("cors");

const app = express();

const noteRoutes = require("./routes/noteRoutes");

app.use("/api/notes", noteRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

module.exports = app;
