const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../middleware/db-mysql")

exports.signup = (req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    if (!username || !email || !password) {{res.status(400).json({message : "Please to fill all the form !"})}} 
    if (username || email) {res.status(400).json({message: "This username or email is already registered !"})}
    else {
        bcrypt.hash(password, 10, (hash) => {
            let data = [[username, email, hash]]
            mysql.query(
                'INSERT INTO user (username, email, password) VALUES ?', [data], (error) => {
                    if (error) {res.status(500).json({error})} 
                    res.status(201).json({message: "User created !"})
                }
            )
        });
    }
};

exports.login = (req, res) => {
    let user = req.body.email
    mysql.query('SELECT * FROM user WHERE email = ?', user, (error, response) => {
        if (error) {res.status(500).json({message: error})}
        else {
            if (response == "") {res.status(401).json({error: "Email unfound"})}
            bcrypt.compare(req.body.password, response[0].password)
            .then((valid) => {
                if (!valid) {res.status(401).json({error: "Password incorrect !"})}
                res.status(200).json({
                    userId: response[0].id,
                    token: jwt.sign(
                        {userId: response[0].id},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn: "24h"}
                    )
                })
            })
        }
    })
};

