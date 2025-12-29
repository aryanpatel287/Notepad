const express = require("express");
const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/noteController");

// List all notes
router.get("/", getNotes);

// Create note
router.post("/", createNote);

// Get single note
router.get("/:id", getNote);

// Update note
router.put("/:id", updateNote);

// Delete note
router.delete("/:id", deleteNote);

module.exports = router;
