// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database file (it will be created if it doesn't exist)
const db = new sqlite3.Database(path.join(__dirname, 'employees.db'), (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the employees table
db.serialize(() => {
  // Optional: drop the table if it exists (useful during development)
  db.run(`DROP TABLE IF EXISTS employees`, (err) => {
    if (err) {
      console.error('Error dropping table:', err.message);
    } else {
      console.log('Dropped existing employees table (if any).');
    }
  });

  // Create the new table with id as the primary key
  db.run(`
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      salary REAL NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating employees table:', err.message);
    } else {
      console.log('Employees table created with id as PRIMARY KEY.');
    }
  });
});

// Export the db object so it can be used elsewhere
module.exports = db;
