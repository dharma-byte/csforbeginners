// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./employees.db', (err) => {
  if (err) return console.error('Error opening DB:', err.message);
  console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTO INCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    salary REAL NOT NULL
  )`);
});

module.exports = db;
