// index.js

const express = require('express');
const app = express();
const PORT = 3000;

// ✅ Import everything properly
const {
  employees,
  addEmployee,
  removeEmployee,
  updateEmployee
} = require('./data');

app.use(express.json());

// GET: List employees
app.get('/api/employees/list', (req, res) => {
  res.json(employees);
});

// POST: Add employee
app.post('/api/employees/add', (req, res) => {
  const employee = req.body;

  if (!employee.name || !employee.position) {
    return res.status(400).json({ error: 'Missing employee name or position' });
  }

  console.log('Received new employee:', employee);

  res.status(200).json({ message: 'Employee added successfully', employee });
});
// DELETE: Remove employee
app.delete('/api/employees/remove', (req, res) => {
  const { id } = req.body;
  const result = removeEmployee(id);
  if (result) {
    res.json({ message: 'Employee removed successfully.' });
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
});

// PATCH: Update employee
app.patch('/api/employees/update', (req, res) => {
  const { id, data } = req.body;
  const result = updateEmployee(id, data);
  if (result) {
    res.json({ message: 'Employee updated successfully.' });
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
