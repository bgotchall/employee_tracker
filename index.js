var inquirer = require("inquirer");
var mysql = require("mysql");
var tables = require("console.table");
var banner=require("./banner");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "boffo",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  //console.log("connected as id " + connection.threadId);
});

function init(){
    console.log(banner.banner());
    setTimeout(function(){ start(); }, 1000);
    
}

function start(){
   // console.clear();
    inquirer.prompt([
        {name: "action",
        type: "list",
        choices:["view all employees","view all departments","view all roles"]
        }

    ]).then(function(answer){
       // console.log(`you chose ${answer.action}`)
        switch (answer.action) {
            case "view all employees":
                connection.query(allEmployeeQuery,function(err,res){
                console.table(res);
                });
                break;
            case "view all departments":
                connection.query("SELECT * FROM department",function(err,res){
                console.table(res);
                });
            case "view all roles":
                connection.query("SELECT * FROM role",function(err,res){
                console.table(res);
                });
            break;
            default:
                break;
        }
        setTimeout(function(){ start(); }, 100);

    });
}

init();


var allEmployeeQuery=`SELECT
employee.id AS id,
employee.first_name AS first_name,
employee.last_name as last_name,
role.title as title,
role.salary as salary,
department.name as department,
employee.manager_id as Manager_id
-- employee(Manager_id).last_name as Manager

FROM
employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id=department.id`