// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// GET /api/employees/list
app.get('/api/employees/list', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/employees/add
app.post('/api/employees/add', (req, res) => {
  const { name, position, salary } = req.body;
  if (!name || !position || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run(
    `INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)`,
    [name, position, salary],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, position, salary });
    }
  );
});

// DELETE /api/employees/remove
app.delete('/api/employees/remove', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  db.run(`DELETE FROM employees WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee removed' });
  });
});

// PATCH /api/employees/update
app.patch('/api/employees/update', (req, res) => {
  const { id, name, position, salary } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  db.run(
    `UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?`,
    [name, position, salary, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Employee not found' });
      res.json({ message: 'Employee updated' });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
