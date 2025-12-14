const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Initialize database (creates file and tables if missing)
require("./src/config/db");

// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

module.exports = app;
