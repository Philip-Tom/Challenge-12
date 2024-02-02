const { promptUser } = require("../utils/inquirer");

const getMainMenuQuestions = async () =>
  await promptUser([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View employees by manager",
        "View employees by department",
        "Delete Employee",
        "View All the Roles",
        "Add Role",
        "Delete Role",
        "View all Departments",
        "Add Department",
        "View department budget",
        "Delete Department",
        "Quit",
      ],
    },
  ]);

module.exports = { getMainMenuQuestions };
