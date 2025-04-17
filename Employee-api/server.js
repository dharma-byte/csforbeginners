// server.js
/**
 * A simple Express server providing RESTful API endpoints to manage employees.
 *
 * Endpoints:
 * - GET    /api/employees/list     - Get all employees
 * - POST   /api/employees/add      - Add a new employee
 * - DELETE /api/employees/remove   - Remove an employee by ID and name
 * - PATCH  /api/employees/update   - Update employee details
 */

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * @route GET /api/employees/list
 * @description Retrieves a list of all employees.
 * @returns {Object[]} 200 - Array of employee records
 * @returns {Object}   500 - Internal server error
 */

// GET /api/employees/list
app.get('/api/employees/list', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * @route POST /api/employees/add
 * @description Adds a new employee to the database.
 * @param {string} name - Employee name
 * @param {string} position - Job title
 * @param {number} salary - Employee salary
 * @returns {Object} 200 - Created employee with ID
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Internal server error
 */

// POST /api/employees/add
app.post('/api/employees/add', (req, res) => {
  const { id, name, position, salary } = req.body;
  if (!id || !name || !position || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run(
    `INSERT INTO employees (id, name, position, salary) VALUES (?, ?, ?, ?)`,
    [id, name, position, salary],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, position, salary });
    }
  );
});


/**
 * @route DELETE /api/employees/remove
 * @description Deletes an employee by ID.
 * @param {number} id - Employee ID
 * @returns {Object} 200 - Deletion success message
 * @returns {Object} 400 - Missing ID
 * @returns {Object} 404 - Employee not found
 * @returns {Object} 500 - Internal server error
 */

// DELETE /api/employees/remove
app.delete('/api/employees/remove', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'ID and Name are required' });

  db.run(`DELETE FROM employees WHERE id = ? AND name = ?`, [id, name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee removed' });
  });
});

/**
 * @route PATCH /api/employees/update
 * @description Updates an employee's information.
 * @param {number} id - Employee ID
 * @param {string} [name] - New name
 * @param {string} [position] - New job title
 * @param {number} [salary] - New salary
 * @returns {Object} 200 - Update success message
 * @returns {Object} 400 - Missing ID
 * @returns {Object} 404 - Employee not found
 * @returns {Object} 500 - Internal server error
 */

// PATCH /api/employees/update
app.patch('/api/employees/update', (req, res) => {
  const { id, name, position, salary } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'ID and Name are required' });

  db.run(
    `UPDATE employees SET position = ?, salary = ? WHERE id = ? AND name = ?`,
    [position, salary, id, name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
      res.json({ message: 'Employee updated' });
    }
  );
});

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
