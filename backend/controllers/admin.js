const mysql = require("../middleware/db-mysql")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {{res.status(400).json({message : "Please to fill all the form !"})}} 
    else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            mysql.query('INSERT INTO admin (username, email, password, image, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP())', [req.body.username, req.body.email, hash, image, Date()], (error) => {
                if (error) {res.status(500).json({error})} 
                res.status(201).json({message: "Admin created !"})
            })
        })
    }
};

exports.login = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE email = ?', req.body.email, (error, response) => {
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

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post', (error, response) => {
        if (error) {res.status(500).json({error})} 
        res.status(200).json(response)
    })
};

exports.onePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
        res.status(200).json(response)
    })
};

exports.deletePost = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE id = ? AND username = ?', [req.body.adminId, req.body.username], (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(401).json({error : "Unauthorized request !"})}
        else {
            mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
            if (error) {res.status(500).json({error})}
            if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
            else {
                if (response[0].image) {
                    let image = response[0].image.toString()
                    let filename = image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        mysql.query('DELETE FROM post WHERE id = ?, image = ?', [req.params.id, image], (error, response) => {
                            if (error) {res.status(500).json({error})}
                            res.status(200).json({message : "Post deleted !"})
                        })
                    })
                } else {
                    mysql.query('DELETE FROM post WHERE id = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                        res.status(200).json({message : "Post deleted !"})
                    })
                }
                mysql.query('SELECT * FROM comments WHERE postId = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM comments WHERE postId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
                mysql.query('SELECT * FROM likes WHERE postId = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM likes WHERE postId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
                mysql.query('SELECT * FROM dislikes WHERE postId = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM dislikes WHERE postId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
            }
            })
        }
    })
};

exports.oneProfile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(404).json({error : "This user doesn't exist"})} 
        res.status(200).json(response)
    })
};

exports.deleteProfile = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE id = ? AND username = ?', [req.body.adminId, req.body.username], (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(404).json({error : "Unauthorized request !"})}
        else {
            mysql.query('SELECT * FROM post WHERE userId = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else {
                    if (response.length == []) {if (error) {res.status(500).json({error})}}
                    else if (response[0].image == null) {
                        mysql.query('DELETE FROM post WHERE userId = ?', req.params.id, (error, response) => {
                            if (error) {res.status(500).json({error})}
                        })
                    } else {
                        let image = response[0].image.toString()
                        let filename = image.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            mysql.query('DELETE FROM post WHERE userId = ? AND image = ?', [req.params.id, image], (error, response) => {
                                if (error) {res.status(500).json({error})}
                            })
                        })
                    }
                }
                mysql.query('SELECT * FROM comments WHERE userId = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM comments WHERE userId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
                mysql.query('SELECT * FROM likes WHERE userId = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM likes WHERE userId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
                mysql.query('SELECT * FROM dislikes WHERE userId = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    mysql.query('DELETE FROM dislikes WHERE userId = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                    })
                })
                mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    if (response[0].image == null) {
                        mysql.query('DELETE FROM user WHERE id = ?', req.params.id, (error, response) => {
                            if (error) {res.status(500).json({error})}
                            res.status(200).json({message : "User deleted !"})
                        })
                    } else {
                        let image = response[0].image.toString()
                        let filename = image.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            mysql.query('DELETE FROM user WHERE id = ? AND image = ?', [req.params.id, image], (error, response) => {
                                if (error) {res.status(500).json({error})}
                                res.status(200).json({message : "User deleted !"})
                            })
                        })
                    }
                })
            })
        }
    })
};
