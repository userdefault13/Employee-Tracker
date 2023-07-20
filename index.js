const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require('./queries');

// Function to display the splash title screen
function displaySplashScreen() {
  console.log(chalk.white(figlet.textSync('Employee Management System')));

  console.log(chalk.blue('******************************************'));
  console.log(chalk.yellow('*                                        *'));
  console.log(chalk.white('*         Welcome to the EMS App!        *'));
  console.log(chalk.yellow('*                                        *'));
  console.log(chalk.blue('******************************************'));
  console.log('\n');
}

// Function to display the main menu
function displayMainMenu() {
  inquirer
  .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          promptAddDepartment();
          break;
        case 'Add a role':
          promptAddRole();
          break;
        case 'Add an employee':
          promptAddEmployee();
          break;
        case 'Update an employee role':
          promptUpdateEmployeeRole();
          break;
        case 'Delete a department':
          promptDeleteDepartment();
          break;
        case 'Delete a role':
          promptDeleteRole();
          break;
        case 'Delete an employee':
          promptDeleteEmployee();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
        default:
          console.log('Invalid option!');
          displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
}

// Function to view all departments
async function viewAllDepartments() {
  try {
    const departments = await getAllDepartments();
    // Display departments in a formatted table or list
    console.table(departments);
    displayMainMenu();
  } catch (error) {
    console.log(`Error viewing departments: ${error.message}`);
    displayMainMenu();
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const roles = await getAllRoles();
    // Display roles in a formatted table or list
    console.table(roles);
    displayMainMenu();
  } catch (error) {
    console.log(`Error viewing roles: ${error.message}`);
    displayMainMenu();
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    const employees = await getAllEmployees();
    // Display employees in a formatted table or list
    console.table(employees);
    displayMainMenu();
  } catch (error) {
    console.log(`Error viewing employees: ${error.message}`);
    displayMainMenu();
  }
}

// Function to add a department
async function promptAddDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Department name cannot be empty.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await addDepartment(answers.name);
        displayMainMenu();
      } catch (error) {
        console.log(`Error adding department: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to add a role
async function promptAddRole() {
  // Prompt the user for role details
  inquirer
    .prompt([
      // Add necessary prompts for role details
      {
        // Example prompt
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Role title cannot be empty.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:',
        validate: (input) => {
          if (!/^\d+(\.\d{1,2})?$/.test(input)) {
            return 'Invalid salary. Please enter a valid number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID of the role:',
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid department ID. Please enter a valid number.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await addRole(
          answers.title,
          parseFloat(answers.salary),
          parseInt(answers.departmentId)
        );
        displayMainMenu();
      } catch (error) {
        console.log(`Error adding role: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to add an employee
async function promptAddEmployee() {
  // Prompt the user for employee details
  inquirer
    .prompt([
      // Add necessary prompts for employee details
      {
        // Example prompt
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        validate: (input) => {
          if (input.trim() === '') {
            return "Employee's first name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        validate: (input) => {
          if (input.trim() === '') {
            return "Employee's last name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the employee's role ID:",
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid role ID. Please enter a valid number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID:",
        default: null,
        validate: (input) => {
          console.log(typeof input)
          if (input === "" ){
            return true;
          }
          if (!/^\d+$/.test(input)) {
            return 'Invalid manager ID. Please enter a valid number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID (optional):",
        default: null, // Set the default value to NULL
        validate: (input) => {
          if (input.trim() === '' || input.trim().toLowerCase() === 'null') {
            return true;
          } else if (isNaN(input)) {
            return 'Invalid manager ID. Please enter a valid number or "null".';
          } else {
            return 'Invalid manager ID. Please enter a valid number or "null".';
          }
        },
      },
    ])
    .then(async (answers) => {
      try {
        await addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
        displayMainMenu();
      } catch (error) {
        console.log(`Error adding employee: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to update an employee role
async function promptUpdateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: "Enter the employee's ID:",
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid employee ID. Please enter a valid number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the new role ID:',
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid role ID. Please enter a valid number.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await updateEmployeeRole(
          parseInt(answers.employeeId),
          parseInt(answers.roleId)
        );
        displayMainMenu();
      } catch (error) {
        console.log(`Error updating employee role: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to delete a department
async function promptDeleteDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department to delete:',
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid department ID. Please enter a valid number.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await deleteDepartment(parseInt(answers.departmentId));
        displayMainMenu();
      } catch (error) {
        console.log(`Error deleting department: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to delete a role
async function promptDeleteRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the role to delete:',
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid role ID. Please enter a valid number.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await deleteRole(parseInt(answers.roleId));
        displayMainMenu();
      } catch (error) {
        console.log(`Error deleting role: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Function to delete an employee
async function promptDeleteEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to delete:',
        validate: (input) => {
          if (!/^\d+$/.test(input)) {
            return 'Invalid employee ID. Please enter a valid number.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      try {
        await deleteEmployee(parseInt(answers.employeeId));
        displayMainMenu();
      } catch (error) {
        console.log(`Error deleting employee: ${error.message}`);
        displayMainMenu();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      displayMainMenu();
    });
}

// Start the application
displaySplashScreen();
displayMainMenu();
