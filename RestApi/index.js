const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let employees = [
    { id: 1, name: "Alice", position: "Developer" },
    { id: 2, name: "Bob", position: "Designer" }
];

//  GET function - Fetch all employees
app.get("/api/employees/list", (req, res) => {
    res.json({ success: true, employees });
});

// POST function - Add a new employee
app.post("/api/employees/add", (req, res) => {
    const { id, name, position } = req.body;
    if (!id || !name || !position) {
        return res.status(400).json({ success: false, message: "Missing employee data" });
    }
    employees.push({ id, name, position });
    res.json({ success: true, message: "Employee added successfully", employees });
});

//  DELETE function - Remove an employee by ID
app.delete("/api/employees/remove", (req, res) => {
    const { id } = req.body;
    employees = employees.filter(emp => emp.id !== id);
    res.json({ success: true, message: "Employee removed", employees });
});

//  PATCH function - Update an employee's details
app.patch("/api/employees/update", (req, res) => {
    const { id, name, position } = req.body;
    let employee = employees.find(emp => emp.id === id);
    if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
    }
    if (name) employee.name = name;
    if (position) employee.position = position;
    res.json({ success: true, message: "Employee updated", employees });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});