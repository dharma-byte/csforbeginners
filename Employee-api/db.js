// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(path.resolve(__dirname, 'employees.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the employees database.');
  }
});

// Create the employees table with a composite primary key (id + name)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER,
      name TEXT,
      position TEXT,
      salary REAL,
      PRIMARY KEY (id, name)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating employees table:', err.message);
    } else {
      console.log('Employees table is ready.');
    }
  });
});

module.exports = db;
