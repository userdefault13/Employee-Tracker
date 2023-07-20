const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '31033103',
  database: 'business_db',
  connectionLimit: 10, // Adjust the limit as per your requirements
});

// Function to execute a query
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to retrieve all departments
async function getAllDepartments() {
  const query = 'SELECT * FROM department';
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw new Error(`Error retrieving departments: ${error.message}`);
  }
}

// Function to retrieve all roles
async function getAllRoles() {
  const query = 'SELECT * FROM role';
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw new Error(`Error retrieving roles: ${error.message}`);
  }
}

// Function to retrieve all employees
async function getAllEmployees() {
  const query = 'SELECT * FROM employee';
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw new Error(`Error retrieving employees: ${error.message}`);
  }
}

// Function to add a department
async function addDepartment(name) {
  const query = 'INSERT INTO department (name) VALUES (?)';
  try {
    await executeQuery(query, [name]);
    console.log('Department added successfully!');
  } catch (error) {
    throw new Error(`Error adding department: ${error.message}`);
  }
}

// Function to add a role
async function addRole(title, salary, departmentId) {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  try {
    await executeQuery(query, [title, salary, departmentId]);
    console.log('Role added successfully!');
  } catch (error) {
    throw new Error(`Error adding role: ${error.message}`);
  }
}

// Function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    try {
      const parsedManagerId = (managerId === "") ? null : managerId;
      await executeQuery(query, [firstName, lastName, roleId, parsedManagerId]);
      console.log('Employee added successfully!');
    } catch (error) {
      throw new Error(`Error adding employee: ${error.message}`);
    }
}  

// Function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  try {
    await executeQuery(query, [roleId, employeeId]);
    console.log('Employee role updated successfully!');
  } catch (error) {
    throw new Error(`Error updating employee role: ${error.message}`);
  }
}

// Function to delete a department
async function deleteDepartment(departmentId) {
  const query = 'DELETE FROM department WHERE id = ?';
  try {
    await executeQuery(query, [departmentId]);
    console.log('Department deleted successfully!');
  } catch (error) {
    throw new Error(`Error deleting department: ${error.message}`);
  }
}

// Function to delete a role
async function deleteRole(roleId) {
  const query = 'DELETE FROM role WHERE id = ?';
  try {
    await executeQuery(query, [roleId]);
    console.log('Role deleted successfully!');
  } catch (error) {
    throw new Error(`Error deleting role: ${error.message}`);
  }
}

// Function to delete an employee
async function deleteEmployee(employeeId) {
  const query = 'DELETE FROM employee WHERE id = ?';
  try {
    await executeQuery(query, [employeeId]);
    console.log('Employee deleted successfully!');
  } catch (error) {
    throw new Error(`Error deleting employee: ${error.message}`);
  }
}

module.exports = {
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
};
