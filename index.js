var inquirer = require("inquirer");
var mysql = require("mysql");
var tables = require("console.table");
var banner=require("./banner");

var keepGoing=true;

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

async function start(){
   // console.clear();
   var roleList=await getRoles();
   var employeeList=await getEmployees();
    inquirer.prompt([
        {name: "action",
        message: "What would you like to do?",
        type: "list",
        choices:["view all Employees",
        "view all Employees by Department",
        "view all Employees by Role",
        "Add Employee",
        "Remove Employee",
        "Exit"]
        }

    ]).then(function(answer){
        switch (answer.action) {
            case "view all Employees":
                connection.query(allEmployeeQuery,function(err,res){
                    console.clear();
                    console.table(res);
                });
                
                break;
            case "view all Employees by Department":
                connection.query(AllEmployeeByDepartmentQuery,function(err,res){
                    console.clear();
                    console.table(res);
                });
                
                break;
            case "view all Employees by Role":
                connection.query(AllEmployeeByRoleQuery,function(err,res){
                    console.clear();
                    console.table(res);
                
                });
            break;
            case "Remove Employee":
                keepGoing=false;
                //get a list of all employees
                inquirer.prompt([
                    {name: "employee",
                    message:"What is the employees to be removed?",
                    type: "list",
                    choices:employeeList
                    }
            
                ]).then(function(answer2){
                    console.log("you chose",answer2);
                    removeEmployee(answer2);
                    keepGoing=true;
                    start();
                });
            break;
            case "Add Employee":
                //first get the info interactively:
                keepGoing=false;
               
                inquirer.prompt([
                    {name: "firstName",
                    message:"What is the first name?",
                    type: "input"
                    },
                    {name: "lastName",
                    message:"What is the last name?",
                    type: "input"
                    },
                    {name: "role",
                    message:"What is the employees role?",
                    type: "list",
                    choices:roleList
                    },
                    {name: "manager",
                    message:"What is the employees manager?",
                    type: "list",
                    choices:employeeList
                    }
                    
            
                ]).then(function(answer2){
                   // setTimeout(function(){ console.log(`hi.  answer was ${answer2.firstName}`)} , 1000);
                   addEmployee(answer2);
                    keepGoing=true;
                    start();
                });
                //then do the query to do the insert:
           break;
            case "Exit":
                keepGoing=false;
                connection.end();
                console.log("Goodbye!");
            break;
            default:
                break;
        }
        setTimeout(function(){ if (keepGoing){start();} }, 100);

    });
}

init();

function getRoles(){
    var roleQuery="SELECT title FROM role";
    var newThing=[];
    connection.query(roleQuery,function(err,data){
        data.forEach(element => {
            let temp=findElement(element);
            newThing.push(temp);
       });
       
    });
    return new Promise(resolve => {
        resolve(newThing);
    });

}

var allEmployeeQuery=`SELECT
employee.first_name AS first_name,
employee.last_name as last_name,
role.title as title,
role.salary as salary,
department.name as department,
CONCAT (m.first_name,' ',m.last_name) AS Manager
FROM
employee 
JOIN  role  ON employee.role_id = role.id
JOIN department ON role.department_id=department.id
LEFT JOIN employee m ON employee.manager_id=m.id`;

var AllEmployeeByDepartmentQuery=`SELECT
employee.first_name AS first_name,
employee.last_name as last_name,
role.title as title,
role.salary as salary,
department.name as department,
CONCAT (m.first_name,' ',m.last_name) AS Manager
FROM
employee 
JOIN  role  ON employee.role_id = role.id
JOIN department ON role.department_id=department.id
LEFT JOIN employee m ON employee.manager_id=m.id
ORDER by department_id`;

var AllEmployeeByRoleQuery=`SELECT
employee.first_name AS first_name,
employee.last_name as last_name,
role.title as title,
role.salary as salary,
department.name as department,
CONCAT (m.first_name,' ',m.last_name) AS Manager
FROM
employee 
JOIN  role  ON employee.role_id = role.id
JOIN department ON role.department_id=department.id
LEFT JOIN employee m ON employee.manager_id=m.id
ORDER by title`;

function findElement(element){
//For some reason, I am getting an ugly not quite an object so stringify it
//and parse the hard way

   // console.log(JSON.stringify(element));
    let temp=JSON.stringify(element);
    temp=temp.replace("\'","");
    temp=temp.split(":");
  //  console.log("split by :",temp[1]);
    let temp2=temp[1].split(`"`);
    temp2=temp2[1];
    //console.log(temp2);

return temp2;
}


async function removeEmployee(name){
    //map back the name to an ID
     var list= await getEmployees();
    console.log("temp list is",list);
    return list;
    }


function addEmployee(name){
       //name is an object like this: 
       //{ firstName: 'Bob', lastName: 'G', role: 'Accounting manager' }
    var query="INSERT INTO employee ";
    query += "(first_name,last_name,role_id,manager_id) ";
    query += "VALUES ";
    query += "(?,?,?,?)";
        console.log(`the whole input is ${JSON.stringify(name)}`);
       console.log("name is",name.firstName, name.lastName);
       console.log("query is ",query);

       //connection.query(query,[name.firstName,name.lastName,name.role,1  ],function(err,data){
       connection.query(query,[name.firstName,name.lastName,3,1  ],function(err,data){
            if (err) throw err;
        });
        //console.log(newThing);
     

};

function getEmployees(){
    var roleQuery="SELECT concat(first_name,', ',last_name) as employee FROM employee;";
    var newThing=[];
    connection.query(roleQuery,function(err,data){
       // console.log(data);
        data.forEach(element => {
            //let temp=findElement(element);
            newThing.push(element.employee);
           // newThing.push(temp);
       });
       //console.log(newThing);
    });
    return new Promise(resolve => {
        resolve(newThing);
    });


};

