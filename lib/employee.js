const db = require("./db");

const getAllEmployees = async () => {
  const query = `
    SELECT 
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      department.name AS department,
      role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `;

  const [employees] = await db.query(query);
  return employees;
};

const addEmployee = async (firstName, lastName, roleName, managerId) => {
  const [role] = await db.query("SELECT id FROM role WHERE title = ?", [
    roleName,
  ]);
  const roleId = role[0].id;

  const query =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  const [result] = await db.query(query, [
    firstName,
    lastName,
    roleId,
    managerId,
  ]);

  return result.insertId;
};

const updateEmployeeRole = async (employeeId, roleId) => {
  const query = "UPDATE employee SET role_id = ? WHERE id = ?";
  await db.query(query, [roleId, employeeId]);
};

const updateEmployeeManager = async (employeeId, managerId) => {
  const query = "UPDATE employee SET manager_id = ? WHERE id = ?";
  await db.query(query, [managerId, employeeId]);
};

const getEmployeesByManager = async (managerId) => {
  const query = `
    SELECT 
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      department.name AS department,
      role.salary
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    WHERE employee.manager_id = ?
  `;

  const [employees] = await db.query(query, [managerId]);
  return employees;
};

const getEmployeesByDepartment = async (departmentId) => {
  const query = `
    SELECT 
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      department.name AS department,
      role.salary
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    WHERE department.id = ?
  `;

  const [employees] = await db.query(query, [departmentId]);
  return employees;
};

const deleteEmployee = async (employeeId) => {
  const query = "DELETE FROM employee WHERE id = ?";
  await db.query(query, [employeeId]);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmployeesByManager,
  getEmployeesByDepartment,
  deleteEmployee,
};
