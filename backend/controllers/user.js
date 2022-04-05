const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../middleware/db-mysql")

exports.signup = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {{res.status(400).json({message : "Please to fill all the form !"})}}
    else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            mysql.query('INSERT INTO user (username, email, password, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP())', [req.body.username, req.body.email, hash, Date()], (error) => {
                if (error) {res.status(500).json({error})} 
                res.status(201).json({message: "User created !"})
            })
        })
    }
};

exports.login = (req, res) => {
    mysql.query('SELECT * FROM user WHERE email = ?', req.body.email, (error, response) => {
    if (error) {res.status(500).json({message: error})}
    if (response == "") {res.status(401).json({error: "Email unfound"})}
        bcrypt.compare(req.body.password, response[0].password)
        .then((valid) => {
            if (!valid) {res.status(401).json({error: "Password incorrect !"})}
            res.status(200).json({
                userId: response[0].id,
                username: response[0].username,
                token: jwt.sign(
                    {userId: response[0].id, 
                    username: response[0].username},
                    "RANDOM_TOKEN_SECRET",
                    {expiresIn: "24h"}
                )
            })
        })
    })
};

