const mysql = require("../middleware/db-mysql")
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

let date = new Date()
date.setHours(date.getHours() + 2);
const current_date = date.toJSON().slice(0, 19).replace('T', ' ');

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post ORDER BY date asc', (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response.map((response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.createPost = (req, res, next) => {
    if (!req.body.description) {{res.status(400).json({message : "Write something in the description !"})}}
    else {
        if (req.file) {
            let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            mysql.query('INSERT INTO post (id, image, description, userId, username, date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP() + 2)', [uuidv4(), image, req.body.description, req.userId, req.username, current_date], (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(201).json({message: "Post created"})
            })
        } else {
            mysql.query('INSERT INTO post (id, description, userId, username, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP() + 2)', [uuidv4(), req.body.description, req.userId, req.username, current_date], (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(201).json({message: "Post created"})
            })
        }
    }
};

exports.onePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({message : "This post doesn't exist"})}
        else res.status(200).json(response.map((response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.modifyPost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (!req.body.description) {{res.status(400).json({message : "Write something in the description !"})}}
            else {
            mysql.query('UPDATE post SET description = ? WHERE id = ?', [req.body.description, req.params.id], (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(200).json({message : "Post updated"})
            })
        }
    })
};

exports.deletePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response[0].userId != req.userId && req.isAdmin == false) {
            return res.status(403).json()
        }
        else {
            if (response[0].image) {
                let image = response[0].image.toString()
                let filename = image.split('/images/')[1]
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
};

exports.comments = (req, res, next) => {
    mysql.query('SELECT * FROM comments WHERE postId = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response)
    })
};

exports.postComments = (req, res, next) => {
    if (req.body.comment == "") {{res.status(400).json({message : "Write something in the comment !"})}}
    else {
        mysql.query('INSERT INTO comments (id, postId, username, userId, comment, date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.params.id, req.username, req.userId, req.body.comment, current_date], (error, response) => {
            if (error) {res.status(500).json({error})}
            mysql.query('UPDATE post SET comments = comments + 1 WHERE id = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(201).json({message: "Comment created"})
            })
        })
    }
};

exports.deleteComments = (req, res, next) => {
    mysql.query('SELECT * FROM comments WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response[0].userId != req.userId && user.isAdmin == false) { return res.status(403).json() }
        else {
            mysql.query('UPDATE post SET comments = comments - 1 WHERE id = ?', response[0].postId, (error, response) => {
            if (error) {res.status(500).json({error})}
                else {
                    mysql.query('DELETE FROM comments WHERE id = ?', [req.params.id], (error, response) => {
                    if (error) {res.status(500).json({error})}
                        else res.status(201).json({message: "Comment created"})
                    })
                }
            })
        }
    })
};
