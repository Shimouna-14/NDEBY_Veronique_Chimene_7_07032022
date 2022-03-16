const mysql = require('mysql');

console.log('Get connection ...');
const db = mysql.createConnection({
    database: process.env.DB, 
    host: process.env.HOST, 
    user: process.env.USERDB, 
    password: process.env.PASSWORD
})
db.connect((err) =>{
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;