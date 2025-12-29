const Note = require("../src/models/Note");

// GET all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();

    res.status(200).json({
      success: true,
      data: notes,
      message: "Notes fetched successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to fetch notes"
    });
  }
};

// GET single note
const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid note ID"
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      data: note,
      message: "Note fetched successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to fetch note"
    });
  }
};

// CREATE note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title and content are required"
      });
    }

    const note = await Note.create({ title, content });

    res.status(201).json({
      success: true,
      data: note,
      message: "Note created successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to create note"
    });
  }
};

// UPDATE note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid note ID"
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title and content are required"
      });
    }

    const updated = await Note.update(id, { title, content });

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "Note updated successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to update note"
    });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid note ID"
      });
    }

    const deleted = await Note.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "Note deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Failed to delete note"
    });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};
