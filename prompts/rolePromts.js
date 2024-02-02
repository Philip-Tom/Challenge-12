const { getAllDepartments } = require("../lib/department");
const { getAllRoles, addRole, deleteRole } = require("../lib/role");
const { promptUser } = require("../utils/inquirer");
const printTable = require("../utils/printTable");

const viewAllRoles = async () => {
  const roles = await getAllRoles();
  printTable(roles);
};

const addRoleAction = async () => {
  const roleName = await promptUser([
    {
      type: "input",
      name: "name",
      message: "What is the name of the role?",
      validate: (input) => input.trim() !== "" || "Role name cannot be empty",
    },
  ]);

  const roleSalary = await promptUser([
    {
      type: "number",
      name: "salary",
      message: "What is the salary for this role?",
      validate: (input) => input > 0 || "Salary must be a positive number",
    },
  ]);

  const departmentsForRole = await getAllDepartments();
  const departmentChoices = departmentsForRole.map(
    (department) => department.name
  );

  const roleDepartment = await promptUser([
    {
      type: "list",
      name: "department",
      message: "Which department does this role belong to?",
      choices: departmentChoices,
    },
  ]);

  await addRole(roleName.name, roleSalary.salary, roleDepartment.department);
  console.log(`Added ${roleName.name} to the database.`);
};

const deleteRoleAction = async () => {
  const roles = await getAllRoles();
  const roleChoices = roles.map((role) => role.title);

  const selectedRole = await promptUser([
    {
      type: "list",
      name: "selectedRole",
      message: "Which role do you want to delete?",
      choices: roleChoices,
    },
  ]);

  const roleId = roles.find(
    (role) => role.title === selectedRole.selectedRole
  ).id;

  try {
    await deleteRole(roleId);
    console.log(`Deleted ${selectedRole.selectedRole} from the database.`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { viewAllRoles, addRoleAction, deleteRoleAction };
