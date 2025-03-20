const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get Employee List
app.get('/api/employees/list', (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ employees: rows });
    });
});

// Add Employee
app.post('/api/employees/add', (req, res) => {
    const { name, position, salary } = req.body;
    if (!name || !position || !salary) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)";
    db.run(sql, [name, position, salary], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, position, salary });
    });
});

// Remove Employee
app.delete('/api/employees/remove/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM employees WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Employee deleted", changes: this.changes });
    });
});

// Update Employee
app.patch('/api/employees/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    
    let sql = "UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?";
    db.run(sql, [name, position, salary, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Employee updated", changes: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});