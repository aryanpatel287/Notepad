-- Schema for Notepad app (MySQL)
CREATE DATABASE IF NOT EXISTS notepad_db;
USE notepad_db;

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example delete statement:
-- DELETE FROM notes WHERE id = 1;
