const { getAllDepartments } = require("../lib/department");
const {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getEmployeesByManager,
  getEmployeesByDepartment,
  deleteEmployee,
} = require("../lib/employee");
const { getAllRoles } = require("../lib/role");
const { promptUser } = require("../utils/inquirer");

const printTable = require("../utils/printTable");

const viewAllEmployees = async () => {
  const employees = await getAllEmployees();
  printTable(employees);
};

const addEmployeeAction = async () => {
  const employeeFirstName = await promptUser([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
      validate: (input) => input.trim() !== "" || "First name cannot be empty",
    },
  ]);

  const employeeLastName = await promptUser([
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
      validate: (input) => input.trim() !== "" || "Last name cannot be empty",
    },
  ]);

  const rolesForEmployee = await getAllRoles();
  const roleChoices = rolesForEmployee.map((role) => role.title);

  const employeeRole = await promptUser([
    {
      type: "list",
      name: "role",
      message: "Select the role for this employee:",
      choices: roleChoices,
    },
  ]);

  const employeesForManager = await getAllEmployees();
  const managerChoices = employeesForManager.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );
  managerChoices.push("None");

  const employeeManager = await promptUser([
    {
      type: "list",
      name: "manager",
      message: "Select the manager for this employee:",
      choices: managerChoices,
    },
  ]);

  const managerId =
    employeeManager.manager !== "None"
      ? employeesForManager.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` ===
            employeeManager.manager
        ).id
      : null;
 
  await addEmployee(
    employeeFirstName.firstName,
    employeeLastName.lastName,
    employeeRole.role,
    managerId
  );
  console.log(`Added ${employeeFirstName.firstName} ${employeeLastName.lastName} to the database.`)
};

const updateEmployeeRoleAction = async () => {
  const employeesForUpdate = await getAllEmployees();
  const updateEmployeeChoices = employeesForUpdate.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );

  const selectedEmployeeForUpdate = await promptUser([
    {
      type: "list",
      name: "selectedEmployee",
      message: "Which employee's role do you want to update?",
      choices: updateEmployeeChoices,
    },
  ]);

  const rolesForUpdate = await getAllRoles();
  const updateRoleChoices = rolesForUpdate.map((role) => role.title);

  const selectedRoleForUpdate = await promptUser([
    {
      type: "list",
      name: "selectedRole",
      message: "Which role do you want to assign to the selected employee?",
      choices: updateRoleChoices,
    },
  ]);

  const employeeIdForUpdate = employeesForUpdate.find(
    (employee) =>
      `${employee.first_name} ${employee.last_name}` ===
      selectedEmployeeForUpdate.selectedEmployee
  ).id;

  const roleIdForUpdate = rolesForUpdate.find(
    (role) => role.title === selectedRoleForUpdate.selectedRole
  ).id;

  await updateEmployeeRole(employeeIdForUpdate, roleIdForUpdate);
  console.log(`Updated ${selectedEmployeeForUpdate.selectedEmployee}'s role to ${selectedRoleForUpdate.selectedRole}.`)
};

const updateEmployeeManagerAction = async () => {
  const employeesForUpdate = await getAllEmployees();
  const updateEmployeeChoices = employeesForUpdate.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );

  const selectedEmployeeForUpdate = await promptUser([
    {
      type: "list",
      name: "selectedEmployee",
      message: "Which employee's manager do you want to update?",
      choices: updateEmployeeChoices,
    },
  ]);

  const employeeIdForUpdate = employeesForUpdate.find(
    (employee) =>
      `${employee.first_name} ${employee.last_name}` ===
      selectedEmployeeForUpdate.selectedEmployee
  ).id;

  const managersForUpdate = employeesForUpdate.filter(
    (employee) =>
      `${employee.first_name} ${employee.last_name}` !==
      selectedEmployeeForUpdate.selectedEmployee
  );

  const managerChoices = managersForUpdate.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );
  managerChoices.push("None");

  const selectedManagerForUpdate = await promptUser([
    {
      type: "list",
      name: "selectedManager",
      message: "Which manager do you want to assign to the selected employee?",
      choices: managerChoices,
    },
  ]);

  const managerIdForUpdate =
    selectedManagerForUpdate.selectedManager !== "None"
      ? managersForUpdate.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` ===
            selectedManagerForUpdate.selectedManager
        ).id
      : null;

  await updateEmployeeManager(employeeIdForUpdate, managerIdForUpdate);
  console.log(`Updated ${selectedEmployeeForUpdate.selectedEmployee}'s manager to ${selectedManagerForUpdate.selectedManager}.`)
};

const viewEmployeesByManagerAction = async () => {
  const managers = await getAllEmployees();
  const managerChoices = managers.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );

  const selectedManager = await promptUser([
    {
      type: "list",
      name: "selectedManager",
      message: "Which manager's employees do you want to view?",
      choices: managerChoices,
    },
  ]);

  const managerId = managers.find(
    (employee) =>
      `${employee.first_name} ${employee.last_name}` ===
      selectedManager.selectedManager
  ).id;

  const employeesByManager = await getEmployeesByManager(managerId);
  printTable(employeesByManager);
};

const viewEmployeesByDepartmentAction = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((department) => department.name);

  const selectedDepartment = await promptUser([
    {
      type: "list",
      name: "selectedDepartment",
      message: "Which department's employees do you want to view?",
      choices: departmentChoices,
    },
  ]);

  const departmentId = departments.find(
    (department) => department.name === selectedDepartment.selectedDepartment
  ).id;

  const employeesByDepartment = await getEmployeesByDepartment(departmentId);
  printTable(employeesByDepartment);
};

const deleteEmployeeAction = async () => {
  const employees = await getAllEmployees();
  const employeeChoices = employees.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );

  const selectedEmployee = await promptUser([
    {
      type: "list",
      name: "selectedEmployee",
      message: "Which employee do you want to delete?",
      choices: employeeChoices,
    },
  ]);

  const employeeId = employees.find(
    (employee) =>
      `${employee.first_name} ${employee.last_name}` ===
      selectedEmployee.selectedEmployee
  ).id;

  try {
    await deleteEmployee(employeeId);
    console.log(`Deleted ${selectedEmployee.selectedEmployee} from the database.`)
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  viewAllEmployees,
  addEmployeeAction,
  updateEmployeeRoleAction,
  updateEmployeeManagerAction,
  viewEmployeesByManagerAction,
  viewEmployeesByDepartmentAction,
  deleteEmployeeAction,
};
