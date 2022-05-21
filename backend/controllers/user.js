const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../middleware/db-mysql")
const { v4: uuidv4 } = require('uuid');

exports.signup = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {{res.status(400).json({message : "Please to fill all the form !"})}}
    else {
        mysql.query('SELECT id FROM admin', (error, response) => {
            if (error) {res.status(500).json({message: error})}
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    mysql.query('INSERT INTO user (id, username, email, password, requestId, date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.body.username, req.body.email, hash, response[0].id, Date()], (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else (res.status(201).json({message: "User created !"}))
                    })
                })
            }
        })
    }
};

exports.login = (req, res) => {
    mysql.query('SELECT * FROM user WHERE email = ?', req.body.email, (error, response) => {
    if (error) {res.status(500).json({message: error})}
    if (response == "") {res.status(401).json({message: "Email unfound"})}
        bcrypt.compare(req.body.password, response[0].password)
        .then((valid) => {
            if (!valid) {res.status(401).json({message: "Password incorrect !"})}
            else {
                const token = jwt.sign({userId: response[0].id, username: response[0].username}, "RANDOM_TOKEN_SECRET", {expiresIn: "24h"})
                res.status(200).json({userId: response[0].id, username: response[0].username, token})
            }
        })
    })
};

exports.logout = (req, res) => {
    res.status(200).json({message: "Log out !"})
};
