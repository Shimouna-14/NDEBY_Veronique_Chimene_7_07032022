const mysql = require("../middleware/db-mysql")
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post', (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response.map((response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.createPost = (req, res, next) => {
    mysql.query('SELECT id FROM admin', (error, response) => {
        if (error) {res.status(500).json({message: error})}
        else {
            if (!req.body.description) {{res.status(400).json({message : "Write something in the description !"})}}
            else {
                if (req.file) {
                    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    mysql.query('INSERT INTO post (id, image, description, userId, username, requestId, date) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), image, req.body.description, req.userId, req.username, response[0].id, Date()], (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else res.status(201).json({message: "Post created"})
                    })
                } else {
                    mysql.query('INSERT INTO post (id, description, userId, username, requestId, date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.body.description, req.userId, req.username, response[0].id, Date()], (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else res.status(201).json({message: "Post created"})
                    })
                }
            }
        }
    })
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

exports.likePost = (req, res, next) => {
    if (req.body.likes == 1) {
        mysql.query('SELECT * FROM dislikes WHERE userId = ?', req.userId, (error, response) => {
            if (response.length == []) {
                mysql.query('INSERT INTO likes (id, postId, userId, username, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.params.id, req.userId, req.username, Date()], (error, response) => {
                    if (error) {res.status(500).json({error})}
                    mysql.query('UPDATE post SET likes = likes + 1 WHERE id = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else res.status(201).json({message : "Post liked !"})
                    })
                })
            }
            else {res.status(400).json({message: "You already like this post !"})}
        })
    };

    if (req.body.likes == 0) {
        mysql.query('DELETE FROM likes WHERE userId = ? AND postId = ?', [req.userId, req.params.id], (error, response) => {
            if (error) {res.status(500).json({error})}
            mysql.query('UPDATE post SET likes = likes - 1 WHERE id = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(200).json({message : "Like removed!"})
            })
        })
    };

    if (req.body.dislikes == -1) {
        mysql.query('SELECT * FROM likes WHERE userId = ?', req.userId, (error, response) => {
            if (response.length == []) {
                mysql.query('INSERT INTO dislikes (id, postId, userId, username, date)  VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.params.id, req.userId, req.username, Date()], (error, response) => {
                    if (error) {res.status(500).json({error})}
                    mysql.query('UPDATE post SET dislikes = dislikes + 1 WHERE id = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else res.status(201).json({message : "Post disliked !"})
                    })
                })
            } else {res.status(400).json({message: "You already dislike this post !"})}
        })
    };

    if (req.body.dislikes == 0) {
        mysql.query('DELETE FROM dislikes WHERE userId = ? AND postId = ?', [req.userId, req.params.id], (error, response) => {
            if (error) {res.status(500).json({error})}
            mysql.query('UPDATE post SET dislikes = dislikes - 1 WHERE id = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(200).json({message : "Dislike removed!"})
            })
        })
    };
};

exports.comments = (req, res, next) => {
    mysql.query('SELECT * FROM comments WHERE postId = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response)
    })
};

exports.postComments = (req, res, next) => {
    mysql.query('SELECT id FROM admin', (error, response) => {
        if (error) {res.status(500).json({message: error})}
        else {
            if (req.body.comment == "") {{res.status(400).json({message : "Write something in the comment !"})}}
            else {
                mysql.query('INSERT INTO comments (id, postId, username, userId, comment, requestId, date) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())', [uuidv4(), req.params.id, req.username, req.userId, req.body.comment, response[0].id, Date()], (error, response) => {
                    if (error) {res.status(500).json({error})}
                    mysql.query('UPDATE post SET comments = comments + 1 WHERE id = ?', req.params.id, (error, response) => {
                        if (error) {res.status(500).json({error})}
                        else res.status(201).json({message: "Comment created"})
                    })
                })
            }
        }
    })

};

exports.deleteComments = (req, res, next) => {
    mysql.query('SELECT * FROM comments WHERE postId = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        mysql.query('DELETE FROM comments WHERE id = ? AND userId = ?', [req.params.id, req.userId], (error, response) => {
            if (error) {res.status(500).json({error})}
            else {
                mysql.query('UPDATE post SET comments = comments - 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    else res.status(200).json({message: "Comment delete"})
                })
            }
        })
    })
};
