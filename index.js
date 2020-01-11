var inquirer = require("inquirer");
var mysql = require("mysql");
var tables = require("console.table");

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

function start(){

    inquirer.prompt([
        {name: "action",
        type: "list",
        choices:["view all employees","view all departments","view all roles"]
        }

    ]).then(function(answer){
        console.log(`you chose ${answer.action}`)
        switch (answer.action) {
            case "view all employees":
                connection.query("SELECT * FROM employee",function(err,res){
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


    });
}


start();