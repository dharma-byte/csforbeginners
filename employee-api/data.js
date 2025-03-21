// data.js

let employees = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Designer" }
];

function addEmployee(employee) {
  employees.push(employee);
}

function removeEmployee(id) {
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    return true;
  }
  return false;
}

function updateEmployee(id, data) {
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    Object.assign(employee, data);
    return true;
  }
  return false;
}

module.exports = {
  employees,
  addEmployee,
  removeEmployee,
  updateEmployee
};
