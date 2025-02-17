const mysql = require('mysql2')
require('dotenv').config();

const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_CONNECTION,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

module.exports = con.promise();
