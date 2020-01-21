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
    choices: ['Display all Departments', 'Display all Roles', 'Display all Employees']
}]).then((response) => {
    if (response.action === 'Display all Departments') {
        queryDept();
    } else if (response.action === 'Display all Roles') {
        queryRole();
    } else if (response.action === 'Display all Employees') {
        queryEmployee();
    }
});