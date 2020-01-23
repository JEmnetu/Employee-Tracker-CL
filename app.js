let mysql = require('mysql');
let cTable = require('console.table');
let inquirer = require('inquirer');

let connection = mysql.createConnection({

    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employees_db'

});

let depIDs = [1, 2, 3, 4, 5];

let queryDept = () => {
    // Render Department Table
    connection.query("SELECT * FROM department;", (err, data) => {
        if (err) {
            console.log('SQL Error => ' + err.stack);
        }
        console.table(data);

    });
}

let queryRole = () => {
    // Render Role Table
    connection.query("SELECT * FROM role;", (err, data) => {
        if (err) {
            console.log("SQL Error => " + err.stack);
        }
        console.table(data);
    });
}

let queryEmployee = () => {

    // Render Employee Table
    connection.query("SELECT * FROM employee;", (err, data) => {
        if (err) {
            console.log("SQL Error => " + err.stack);
        }
        console.table(data);
    });
}




connection.connect((err) => {
    if (err) {
        console.log("Big ole error => " + err.stack);
        return;
    }

    console.log('Connection to SQL established as ID ' + connection.threadId);
});

//================== SQL Queries ==================

// queryDept();

inquirer.prompt([{
    name: 'action',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Display all Departments', 'Display all Roles', 'Display all Employees', 'Add Department', 'Add Role', 'Add Employee']
}]).then((response) => {
    if (response.action === 'Display all Departments') {
        queryDept();
    } else if (response.action === 'Display all Roles') {
        queryRole();
    } else if (response.action === 'Display all Employees') {
        queryEmployee();
    } else if (response.action === 'Add Department') {
        inquirer.prompt({
                name: 'newDept',
                message: 'What department would you like to add?',
                type: "input"
            })
            .then((data) => {
                connection.query("INSERT INTO department (name) VALUES(?)", [data.newDept], (err, data) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    console.log('Department added!');
                    depIDs.push(data.id);
                    queryDept();
                });

            });
    } else if (response.action === 'Add Role') {
        inquirer.prompt([{
                name: "newRole",
                message: 'What role would you like to add?',
                type: "input"
            }, {
                name: "newSalary",
                message: "What is the base salary for this role?",
                type: "input"
            }, {
                name: 'deptId',
                message: 'What is their department ID?',
                type: "list",
                choices: depIDs
            }])
            .then((data) => {
                connection.query('INSERT INTO role SET ?', { title: data.newRole, salary: data.newSalary, department_id: data.deptId }, (err, result) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    queryRole();
                })
            });
    } else if (response.action === 'Add Employee') {
        inquirer.prompt([{
                    name: "firstName",
                    message: "Enter their first name:",
                    type: "input"
                },
                {
                    name: "lastName",
                    message: "Enter their last name:",
                    type: "input"

                },
                {
                    name: 'roleID',
                    message: "Select their role id:",
                    type: "list",
                    choices: depIDs
                },
                {
                    name: "managerID",
                    message: "Enter their manager ID:",
                    type: "input"
                }
            ])
            .then((data) => {
                connection.query('INSERT INTO employee SET ?', { first_name: data.firstName, last_name: data.lastName, role_id: data.roleID, manager_id: data.managerID }, (err, result) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    queryEmployee();
                })
            })
    }
});