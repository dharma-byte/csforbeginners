// index.js

const express = require('express');
const app = express();
const PORT = 5000;

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
  res.json({
      success: true,
      employees: employees
  });
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

  // Check if ID was provided or not
  if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
  }

  // Find employee to remove
  const index = employees.findIndex(emp => emp.id === id);

  // If not found
  if (index === -1) {
      return res.status(404).json({ success: false, message: "Employee not found." });
  }

  // Remove employee
  employees.splice(index, 1);

  res.json({
      success: true,
      message: `Employee with ID ${id} removed.`,
      employees
  });
});

// PATCH: Update employee
app.patch('/api/employees/update', (req, res) => {
  const { id, name, position } = req.body;

  if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
  }

  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
  }

  if (name) employee.name = name;
  if (position) employee.position = position;

  res.json({
      success: true,
      message: `Employee with ID ${id} updated successfully.`,
      employee
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
