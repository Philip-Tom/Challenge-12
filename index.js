const initializeDatabase = require("./utils/dbInitialization");
const { getMainMenuQuestions } = require("./prompts/mainQuestions");
const {
  viewAllEmployees,
  addEmployeeAction,
  updateEmployeeRoleAction,
  updateEmployeeManagerAction,
  viewEmployeesByManagerAction,
  viewEmployeesByDepartmentAction,
  deleteEmployeeAction,
} = require("./prompts/employeePromts");
const {
  viewAllRoles,
  addRoleAction,
  deleteRoleAction,
} = require("./prompts/rolePromts");
const {
  viewAllDepartments,
  addDepartmentAction,
  viewDepartmentBudgetAction,
  deleteDepartmentAction,
} = require("./prompts/departmentPromts");
const printAsciiArt = require("./utils/asciiArt");

const main = async () => {
  await initializeDatabase();
  let userAction = "";

  while (userAction !== "Quit") {
    const userInput = await getMainMenuQuestions();

    userAction = userInput.action;

    switch (userAction) {
      case "View All Employees":
        await viewAllEmployees();
        break;

      case "View All the Roles":
        await viewAllRoles();
        break;

      case "View all Departments":
        await viewAllDepartments();
        break;

      case "Add Department":
        await addDepartmentAction();
        break;

      case "Add Role":
        await addRoleAction();
        break;

      case "Delete Role":
        await deleteRoleAction();
        break;

      case "Add Employee":
        await addEmployeeAction();
        break;

      case "Update Employee Role":
        await updateEmployeeRoleAction();
        break;

      case "Update Employee Manager":
        await updateEmployeeManagerAction();
        break;

      case "View employees by manager":
        await viewEmployeesByManagerAction();
        break;

      case "View employees by department":
        await viewEmployeesByDepartmentAction();
        break;

      case "Delete Employee":
        await deleteEmployeeAction();
        break;
        
      case "View department budget":
        await viewDepartmentBudgetAction();
        break;

      case "Delete Department":
        await deleteDepartmentAction();
        break;

      case "Quit":
        console.log("Exiting the application. Goodbye!");
        process.exit();

      default:
        console.log("Invalid action");
    }
  }
};

printAsciiArt("Employee\nManagement");
main();
