-- Active: 1684194775086@@127.0.0.1@3306@business_db
DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;

-- Create the department table
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

-- Create the role table
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Drop the existing foreign key constraint
ALTER TABLE employee DROP FOREIGN KEY employee_ibfk_2;

-- Add a new foreign key constraint allowing null values
ALTER TABLE employee
ADD CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL;
