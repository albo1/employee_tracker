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