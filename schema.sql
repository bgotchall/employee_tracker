DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Shipping");
INSERT INTO department (name) VALUES ("Executive");

INSERT INTO role (title,salary,department_id) 
VALUES ("CEO",250000,4);

INSERT INTO role (title,salary,department_id) 
VALUES ("Packer",50000,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Joe","Smith",1,NULL);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Steve","Smithson",2,1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- Be explicit about the columns you select in a JOIN query */
SELECT
  employee.id AS employee_id,
  employee.first_name AS first_name,
  employee.last_name as last_name,
  employee.role_id as role_id,
  role.title as title,
  role.salary as salary
FROM
  employee 
  JOIN role ON employee.role_id = role.id
WHERE
  -- event.id = <event to find attendees for>

-- this is a select to show all info about each employee:  A triple join
SELECT
  employee.id AS employee_id,
  employee.first_name AS first_name,
  employee.last_name as last_name,
  employee.role_id as role_id,
  role.title as title,
  role.salary as salary,
  department.name as department
FROM
employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id=department.id


