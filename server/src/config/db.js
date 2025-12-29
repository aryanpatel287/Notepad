const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "notepad_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Failed to connect to MySQL database:", err.message);
    return;
  }
  console.log("Connected to MySQL database:", process.env.DB_NAME || "notepad_db");
  connection.release();
});

// Export promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;
