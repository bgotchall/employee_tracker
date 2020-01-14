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

INSERT INTO department (name) 
VALUES 
("Accounting"),("Legal"),("Shipping"), ("Executive");

INSERT INTO role (title,salary,department_id) 
VALUES 
	("CEO",250000,4),
    ("Lawyer",100000,2),
    ("Accountant",100000,1),
	("Accounting manager",100000,1),
	("Junior Accountant",70000,1),
    ("Shipping manager",70000,3),
	("Packer",50000,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES 
	("Joe","Smith",1,NULL),
    ("Wally","Accoutantboss",4,1),
    ("Sally","Jones",3,2),
	("Mike","packerboss",6,1),
	("Steve","Smithson",7,4);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;


SELECT
  employee.id AS employee_id,
  employee.first_name AS first_name,
  employee.last_name as last_name,
  employee.role_id as role_id,
  role.title as title,
  role.salary as salary,
  department.name as department,
  CONCAT (m.first_name,' ',m.last_name) AS Manager
FROM
employee 
JOIN  role  ON employee.role_id = role.id
JOIN department ON role.department_id=department.id
LEFT JOIN employee m ON employee.manager_id=m.id

-- for reference:

Complete SELECT query
SELECT DISTINCT column, AGG_FUNC(column_or_expression), …
FROM mytable
    JOIN another_table
      ON mytable.column = another_table.column
    WHERE constraint_expression
    GROUP BY column
    HAVING constraint_expression
    ORDER BY column ASC/DESC
    LIMIT count OFFSET COUNT;



