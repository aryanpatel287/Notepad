const db = require("../config/db");

class Note {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { title, content } = data;
    const [result] = await db.query(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title || null, content || null]
    );
    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const { title, content } = data;
    const [result] = await db.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      [title || null, content || null, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM notes WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Note;
