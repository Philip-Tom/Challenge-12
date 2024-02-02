const db = require("./db");

const getAllDepartments = async () => {
  const [departments] = await db.query("SELECT * FROM department");
  return departments;
};

const addDepartment = async (departmentName) => {
  const query = "INSERT INTO department (name) VALUES (?)";
  const [result] = await db.query(query, [departmentName]);
  return result.insertId;
};

const getDepartmentBudget = async (departmentId) => {
  const query = `
    SELECT SUM(role.salary) AS total_budget
    FROM employee
    JOIN role ON employee.role_id = role.id
    WHERE role.department_id = ?
  `;

  const [result] = await db.query(query, [departmentId]);
  return result[0].total_budget || 0;
};

const deleteDepartment = async (departmentId) => {
  const rolesInDepartment = await db.query(
    "SELECT * FROM role WHERE department_id = ?",
    [departmentId]
  );

  if (rolesInDepartment[0].length > 0) {
    throw new Error(
      "\nCannot delete department with associated roles. Please reassign or delete roles first.\n"
    );
  }

  const query = "DELETE FROM department WHERE id = ?";
  await db.query(query, [departmentId]);
};

module.exports = {
  getAllDepartments,
  addDepartment,
  getDepartmentBudget,
  deleteDepartment,
};
