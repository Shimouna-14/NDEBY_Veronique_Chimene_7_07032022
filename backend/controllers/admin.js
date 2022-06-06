const mysql = require("../middleware/db-mysql")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.login = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE email = ?', req.body.email, (error, response) => {
        if (error) {res.status(500).json({message: error})}
        if (response == "") {res.status(401).json({error: "Email unfound"})}
        bcrypt.compare(req.body.password, response[0].password)
        .then((valid) => {
            if (!valid) {res.status(401).json({error: "Password incorrect !"})}
            else {
                const token = jwt.sign({adminId: response[0].id, username: response[0].username}, "RANDOM_TOKEN_SECRET", {expiresIn: "24h"})
                res.status(200).json({adminId: response[0].id, username: response[0].username, token})
            }
        })
    })
};

exports.logout = (req, res) => {
    res.status(200).json({message: "Log out !"})
};

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post', (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(
            response.map((response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.onePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
        else res.status(200).json(
            response.map((response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.deletePost = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE id = ?', req.adminId, (error, response) => {
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
                            mysql.query('DELETE FROM post WHERE id = ? AND image = ?', [req.params.id, image], (error, response) => {
                                if (error) {res.status(500).json({error})}
                                else res.status(200).json({message : "Post deleted !"})
                            })
                        })
                    } else {
                        mysql.query('DELETE FROM post WHERE id = ?', req.params.id, (error, response) => {
                            if (error) {res.status(500).json({error})}
                            else res.status(200).json({message : "Post deleted !"})
                        })
                    }
                }
            })
        }
    })
};

exports.comments = (req, res, next) => {
    mysql.query('SELECT * FROM comments WHERE postId = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response)
    })
};

exports.deleteComments = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE id = ?', req.adminId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response == []) {res.status(404).json({error : "Unauthorized request !"})}
        else {
            mysql.query('SELECT * FROM comments WHERE id = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                mysql.query('UPDATE post SET comments = comments - 1 WHERE id = ?', response[0].postId, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    else {
                        mysql.query('DELETE FROM comments WHERE id = ?', [req.params.id], (error, response) => {
                        if (error) {res.status(500).json({error})}
                            else res.status(201).json({message: "Comment created"})
                        })
                    }
                })
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

exports.postProfile = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE userId = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response.map( (response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.deleteProfile = (req, res, next) => {
    mysql.query('SELECT * FROM admin WHERE id = ?', req.adminId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "Unauthorized request !"})}
        else {
            mysql.query('DELETE FROM user WHERE id = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else {res.status(200).json({message : "User deleted !"})}
            })
        }
    })
};
