const express = require('express');
const app = express();
const PORT = 4000;

const { employees, addEmployee, removeEmployee, updateEmployee } = require('./data');

app.use(express.json());

// GET: List all employees
app.get('/api/employees/list', (req, res) => {
  res.json(employees);
});

// POST: Add new employee
app.post('/api/employees/add', (req, res) => {
  const newEmployee = req.body;
  addEmployee(newEmployee);
  res.json({ message: 'Employee added successfully.', employee: newEmployee });
});

// DELETE: Remove employee by ID
app.delete('/api/employees/remove', (req, res) => {
  const { id } = req.body;
  const result = removeEmployee(id);
  if (result) {
    res.json({ message: 'Employee removed successfully.' });
  } else {
    res.status(404).json({ message: 'Employee not found.' });
  }
});

// PATCH: Update employee data by ID
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
