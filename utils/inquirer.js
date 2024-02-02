const inquirer = require("inquirer");

const promptUser = async (questions) => {
  return inquirer.prompt(questions);
};

module.exports = { promptUser };
