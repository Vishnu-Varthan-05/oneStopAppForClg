const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: config.development.host,
  user: config.development.username,
  password: config.development.password,
  database: config.development.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('connection', (connection) => {
  console.log('MySQL connection established');
});

pool.on('acquire', (connection) => {
  console.log('MySQL connection acquired');
});

pool.on('release', (connection) => {
  console.log('MySQL connection released');
});

module.exports = pool;
