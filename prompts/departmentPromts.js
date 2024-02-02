const {
  getAllDepartments,
  addDepartment,
  getDepartmentBudget,
  deleteDepartment,
} = require("../lib/department");
const { promptUser } = require("../utils/inquirer");
const printTable = require("../utils/printTable");

const viewAllDepartments = async () => {
  const departments = await getAllDepartments();
  printTable(departments);
};

const addDepartmentAction = async () => {
  const departmentName = await promptUser([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
      validate: (input) =>
        input.trim() !== "" || "Department name cannot be empty",
    },
  ]);
  
  await addDepartment(departmentName.name);
  console.log(`Added ${departmentName.name} to the database.`)
};

const viewDepartmentBudgetAction = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((department) => department.name);

  const selectedDepartment = await promptUser([
    {
      type: "list",
      name: "selectedDepartment",
      message: "Which department's budget would you like to view?",
      choices: departmentChoices,
    },
  ]);

  const departmentId = departments.find(
    (department) => department.name === selectedDepartment.selectedDepartment
  ).id;

  const departmentBudget = await getDepartmentBudget(departmentId);
  console.log(
    `\nTotal Utilized Budget for ${selectedDepartment.selectedDepartment}: $${departmentBudget}\n`
  );
};

const deleteDepartmentAction = async () => {
  const departments = await getAllDepartments();
  const departmentChoices = departments.map((department) => department.name);

  const selectedDepartment = await promptUser([
    {
      type: "list",
      name: "selectedDepartment",
      message: "Which department do you want to delete?",
      choices: departmentChoices,
    },
  ]);

  const departmentId = departments.find(
    (department) => department.name === selectedDepartment.selectedDepartment
  ).id;

  try {
    await deleteDepartment(departmentId);
    console.log(
      `Deleted ${selectedDepartment.selectedDepartment} from the database.`
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  viewAllDepartments,
  addDepartmentAction,
  viewDepartmentBudgetAction,
  deleteDepartmentAction,
};
