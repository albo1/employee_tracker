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
      message: 'What would you like to do?',
      choices: [
        promptMessages.viewDepartments,
        promptMessages.viewRoles,
        promptMessages.viewEmployees,
        promptMessages.addDepartment,
        promptMessages.addRole,
        promptMessages.addEmployee,
        promptMessages.updateEmployeeRole,
        promptMessages.quit
      ]
    })
    .then(answer => {
      console.log('answer', answer);
      switch (answer.options) {
        case promptMessages.viewDepartments:
          viewDepartments();
          break;

        case promptMessages.viewRoles:
          viewRoles();
          break;
        case promptMessages.viewEmployees:
          viewEmployees();
          break;
        case promptMessages.addDepartment:
          addDepartment();
          break;
        case promptMessages.addRole:
          addRole();
          break;
        case promptMessages.addEmployee:
          addEmployee();
          break;
        case promptMessages.updateEmployeeRole:
          updateEmployeeRole();
          break;
        case promptMessages.quit:
          db.end();
          initQuest();
          break;
      }

    });
}

function viewDepartments() {
  const query = 'SELECT name AS Department, id AS "Department ID" FROM department';
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initQuest();
  });
}

function viewRoles() {
  const query = 'SELECT role.title AS "Job Title", role.id AS "Role Id", department.name AS Department, role.salary AS Salary FROM role INNER JOIN department ON department.id = role.department_id';
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initQuest();
  });
}

function viewEmployees() {
  const query = 'SELECT e.id AS "Employee Id", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Job Title", department.name AS Department, role.salary AS Salary, m.first_name AS "Manager First Name", m.last_name AS "Manager Last Name" FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY e.id';
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    initQuest();
  });
}