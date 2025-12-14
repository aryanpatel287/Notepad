const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
});

const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL server");

  connection.query(schema, (err) => {
    if (err) {
      console.error("Error creating database/table:", err.message);
      connection.end();
      process.exit(1);
    }
    console.log("Database and table created successfully");
    connection.end();
    process.exit(0);
  });
});
