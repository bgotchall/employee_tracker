var inquirer = require("inquirer");
var keepGoing=true;

function startLoop() {
  inquirer
    .prompt([
      {
        type: "Choice",
        name: "action",
        message: "What Would you like to do?",
        type: "list",
        choices: [
          "view all Employees",
          "view all Employees by Department",
          "view all Employees by Role",
          "Add Employee",
          "Remove Employee",
          "Exit"
        ]
      }
    ])
    .then(function(results) {
        keepGoing=false;
      switch (results.action) {
        case "view all Employees"
        case "Add Employee":
          inquirer
            .prompt([{
              type: "input",
              name: "firstName",
              message: "First Name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "Last Name?"
              }])
            .then(function(results){ 
                console.log(results.firstName)
                startLoop();
            });
          break;
          case "Remove Employee"

          break;
          case "Exit":
            keepGoing=false;
            //connection.end();
            console.log("Goodbye!");
          break;

        default:
          break;
      }

      setTimeout(function(){ if (keepGoing){startLoop();} }, 100);
    });
   
}

startLoop();
