// (db.js)
/**
 * db.js
 * 
 * Initializes and exports the SQLite database connection.
 * Creates an "employees" table if it does not already exist.
 */
const sqlite3 = require('sqlite3').verbose();

/**
 * Connect to the SQLite database.
 * If the database file doesn't exist, it will be created automatically.
 */

const db = new sqlite3.Database('./employees.db', (err) => {
  if (err) return console.error('Error opening DB:', err.message);
  console.log('Connected to SQLite database.');
});

/**
 * Create the "employees" table if it doesn't already exist.
 * Fields:
 * - id: Auto-incremented primary key
 * - name: Employee's name (string, required)
 * - position: Job title (string, required)
 * - salary: Salary (real number, required)
 */

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    salary REAL NOT NULL
  )`);
});

module.exports = db;
