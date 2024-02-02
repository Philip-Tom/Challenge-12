const db = require("./db");

const getAllRoles = async () => {
  const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `;

  const [roles] = await db.query(query);
  return roles;
};

const addRole = async (title, salary, departmentName) => {
  const [department] = await db.query(
    "SELECT id FROM department WHERE name = ?",
    [departmentName]
  );
  const departmentId = department[0].id;

  const query =
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  const [result] = await db.query(query, [title, salary, departmentId]);

  return result.insertId;
};

const deleteRole = async (roleId) => {
  const employeesWithRole = await db.query(
    "SELECT * FROM employee WHERE role_id = ?",
    [roleId]
  );

  if (employeesWithRole[0].length > 0) {
    throw new Error(
      "\nCannot delete role with associated employees. Please reassign or delete employees first.\n"
    );
  }

  const query = "DELETE FROM role WHERE id = ?";
  await db.query(query, [roleId]);
};

module.exports = { getAllRoles, addRole, deleteRole };
