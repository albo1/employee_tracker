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
  });
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } console.log(`Connected to Employee Database!`)
});

const promptMessages = {
  viewDepartments: 'View all Departments',
  viewRoles: 'View all Roles',
  viewEmployees: 'View All Employees',
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
          // initQuest();
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

function addDepartment() {
  inquirer
    .prompt({
      name: 'newdept',
      type: 'input',
      message: 'What Department would you like to add?'
    })
    .then(answer => {
      const query = `INSERT INTO department(name) VALUES ("${answer.newdept}")`;
      db.query(query, (err) => {
        if (err) {
          console.log(err);
        } console.log("Successfully added new Department to database!");
      });
      initQuest();
    });
}

function addRole() {
  inquirer
    .prompt([{
      name: 'newrole',
      type: 'input',
      message: 'What role would you like to add?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What would you like the salary to be?'
    },
    {
      name: 'department',
      type: 'list',
      message: 'What department does the role belong to?',
      choices: [
        'Sales',
        'Marketing',
        'Executive',
        'IT',
        'HR'
      ],
    }
    ])
    .then(answer => {
      const query = `INSERT INTO role(title, salary, department_id) VALUES ("${answer.newrole}", ${answer.salary}, (SELECT id FROM department WHERE name = "${answer.department}"))`;
      db.query(query, (err) => {
        if (err) {
          console.log(err);
        } console.log("Successfully added new role to database!");
      });
      initQuest();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'newemployeefirstname',
        type: 'input',
        message: 'What is the new employees First name?'
      },
      {
        name: 'newemployeelastname',
        type: 'input',
        message: 'What is the new employees Last name?'
      },
      {
        name: 'newjob',
        type: 'list',
        message: 'What is the employees job title?',
        choices: ['Sales Rep', 'Marketing Rep', 'CFO', 'Junior Software Engineer', 'Human Resouce Assistant'
        ],
      },
      {
        name: 'newmanager',
        type: 'list',
        message: 'What is the managers name?',
        choices: ['Peter Parker', 'Kara Zor-El', 'Mark Grayson', 'Barbara Gordon', 'Mikasa Ackerman'
        ],
      }
    ])
    .then(answer => {
      const rolequery = `SELECT id FROM role WHERE title = ("${answer.newjob}")`
      const managerquery = `(SELECT id FROM employee WHERE last_name = "${answer.newmanager.split(" ")[1]}")`
      const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.newemployeefirstname}", "${answer.newemployeelastname}",(SELECT id FROM role WHERE title = "${answer.newjob}") , (SELECT id FROM employee WHERE last_name = "${answer.newmanager}"))`;

      db.query(rolequery, (err, rdata) => {
        if (err) {
          console.log(err);
        }
        const roleId = rdata[0].id;
        db.query(managerquery, (err, mdata) => {
          if (err) {
            console.log(err);
          }
          console.log('mdata', mdata);
          const managerId = mdata[0].id;
          db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.newemployeefirstname}", "${answer.newemployeelastname}", "${roleId}", "${managerId}")`, (err) => {
            if (err) {
              console.log(err);
            } console.log("Successfully added new employee to database!");
          });
          initQuest();
        });
      });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([{
      name: 'pickemployee',
      type: 'list',
      message: 'Which employee would you like to update?',
      choices: [
        'Jean Grey',
        'Barry Allen',
        'Spike Spiegel',
        'Izuku Midoriya',
        'Toshinori Yagi',
        'Itachi Uchiha',
        'Saitama Capedbaldy',
        'Mikasa Ackerman',
        'Revy Lee',
      ],
    },
    {
      name: 'picknewrole',
      type: 'list',
      message: 'What is the employees new role?',
      choices: [
        'Sales Rep',
        'Marketing Rep',
        'CFO',
        'Junior Software Engineer',
        'Human Resource Assistant'
      ],
    }])
    .then(answer => {
      const query = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = "${answer.picknewrole}") WHERE CONCAT(first_name, " ", last_name) = "${answer.pickemployee}"`;
      db.query(query, (err) => {
        if (err) {
          console.log(err);
        } console.log("Succesfully Updated Employee!");
      });
      initQuest();
    });
}

db.connect(err => {
  if (err) throw err;
  initQuest();
});