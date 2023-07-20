
# Employee Tracker App
![License](https://img.shields.io/badge/License-MIT-green.svg)

## Description
The Employee Tracker App is a command-line interface (CLI) application that allows users to manage employee data in a business database. It provides functionalities to view all departments, roles, and employees, add new departments, roles, and employees, update an employee's role, and delete departments, roles, and employees.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To use the Employee Tracker App, you'll need to have Node.js installed on your machine. Once you have Node.js installed, follow these steps:
1. Clone this repository to your local machine.
2. Open a terminal or command prompt and navigate to the root folder of the app.
3. Run npm install to install the required dependencies.
Usage
4. After completing the installation steps, run the app using the following command:
`node index.js`
5. The application will display a splash title screen and the main menu with various options for managing employee data.

Dependencies

mysql2: A MySQL client for Node.js, used to interact with the MySQL database.
inquirer: A powerful CLI user interface library for Node.js, used to prompt and receive user input.
figlet: A command-line ASCII art generator, used to display the title splash screen.

## Usage
1. Select an option from the main menu using the arrow keys and press "Enter" to perform the corresponding action.

2. Depending on the selected action, you may be prompted to enter additional details such as employee names, department names, role information, etc.

3. Follow the prompts to complete the desired action.

To exit the application, select the "Exit" option from the main menu.

## License
This project is licensed under the MIT license.

MIT

## Contributing
Contributions to the Employee Tracker App are welcome! If you find any issues or have suggestions for improvements, please create a pull request or submit an issue on the GitHub repository.

## Tests
Test, test, and test some more


## Questions
For any questions or feedback regarding this application, please feel free to reach out to me at  or on [GitHub](https://github.com/).








## Features
• View all departments: Display a table of all existing departments in the database.
• View all roles: Display a table of all existing roles in the database.
• View all employees: Display a table of all existing employees in the database.
• Add a department: Add a new department to the database.
• Add a role: Add a new role to the database, specifying the title, salary, and department.
• Add an employee: Add a new employee to the database, providing the first name, last name, role, and manager (if applicable).
• Update an employee role: Change the role of an existing employee in the database.
• Delete a department: Remove a department and its associated roles and employees from the database.
• Delete a role: Remove a role and its associated employees from the database.
• Delete an employee: Remove an employee from the database.
• Dependencies
• The Employee Tracker App uses the following dependencies:
