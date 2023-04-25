const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
cTable;

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: 'ALLmight',
      database: 'employees_db'
    },
    console.log(`Connected to Employee Database!`)
  );

const promptMessages = {
    viewDepartments: 'View all Departments',
    viewRoles: 'View all Roles',
    viewEmployees: 'View All employees',
    addDepartment: 'Add a Department',
    addRole: 'Add a Role',
    addEmployee: 'Add a new Employee',
    updateEmployeeRole: 'Update an Employee Role',
    quit: 'Quit'
};

function initQuest() {
  inquirer
    .prompt({
      name: 'options',
      type: 'list',
      
    })
}