const getNotes = (req, res) => {
  res.json({ message: "Get all notes (controller)" });
};

module.exports = {
  getNotes
};
