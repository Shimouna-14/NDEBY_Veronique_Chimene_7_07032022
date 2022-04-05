const mysql = require("../middleware/db-mysql")
const fs = require("fs");

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post', (error, response) => {
        if (error) {res.status(500).json({error})} 
        res.status(200).json(response)
    })
};

exports.createPost = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.body.userId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (!req.body.description) {{res.status(400).json({message : "Write something in the description !"})}}
        if (req.userId !== response[0].id || req.username !== response[0].username) {res.status(400).json({error : "Unauthorized request !"})}
        else {
            if (req.file) {
                let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                mysql.query('INSERT INTO post (userId, username, image, description, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())', [req.body.userId, req.body.username, image, req.body.description, Date()], (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    res.status(201).json({message: "Post created"})
                })
            } else {
                mysql.query('INSERT INTO post (userId, username, description, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP())', [req.body.userId, req.body.username, req.body.description, Date()], (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    res.status(201).json({message: "Post created"})
                })
            }
        }
    })
};

exports.onePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
        res.status(200).json(response)
    })
};

exports.modifyPost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
        if (req.userId !== response[0].userId || req.username !== response[0].username) {res.status(401).json({error : "Unauthorized request !"})}
        if (!req.body.description) {{res.status(400).json({message : "Write something in the description !"})}}
        else {
            if (response[0].image) {
                let image = response[0].image.toString()
                let oldFilename = image.split('/images/')[1];
                fs.unlink(`images/${oldFilename}`, () => {
                    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    mysql.query('UPDATE post SET image = ?, description = ? WHERE id = ?', [image, req.body.description, req.params.id], (error, response) => {
                        if (error) {res.status(500).json({error})}
                        res.status(200).json({message : "Post updated"})
                    })
                })
            } else {
                mysql.query('UPDATE post SET description = ? WHERE id = ?', [req.body.description, req.params.id], (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(200).json({message : "Post updated"})
                })
            }
        }
    })
};

exports.deletePost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({error : "This post doesn't exist"})}
        if (req.userId !== response[0].userId || req.username !== response[0].username) {res.status(401).json({error : "Unauthorized request !"})}
        else {
            if (response[0].image) {
                let image = response[0].image.toString()
                let filename = image.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    mysql.query('DELETE FROM post WHERE id = ? AND image = ?', [req.params.id, image], (error, response) => {
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
};

exports.likePost = (req, res, next) => {
    mysql.query('SELECT userId, username FROM likes WHERE userId = ? AND username = ?', [req.body.userId, req.body.username], (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == [] && req.body.likes == 1) {
            mysql.query('INSERT INTO likes (postId, userId, username, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP())', [req.params.id, req.body.userId, req.body.username, Date()], (error, response) => {
                if (error) {res.status(500).json({error})}
                if (req.body.userId !== req.userId || req.body.username !== req.username) {res.status(401).json({error : "Unauthorized request !"})}
                mysql.query('UPDATE post SET likes = likes + 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(201).json({message : "Post liked !"})
                })
            })
        }

        if (response && req.body.likes == 0) {
            mysql.query('DELETE FROM likes WHERE userId = ? AND postId = ?', [req.body.userId, req.params.id], (error, response) => {
                if (error) {res.status(500).json({error})}
                if (req.body.userId !== req.userId || req.body.username !== req.username) {res.status(401).json({error : "Unauthorized request !"})}
                mysql.query('UPDATE post SET likes = likes - 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(200).json({message : "Like removed!"})
                })
            })
        }
    })

    mysql.query('SELECT userId, username FROM dislikes WHERE userId = ? AND username = ?', [req.body.userId, req.body.username], (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == [] && req.body.dislikes == -1) {
            mysql.query('INSERT INTO dislikes (postId, userId, username, date)  VALUES (?, ?, ?, CURRENT_TIMESTAMP())', [req.params.id, req.body.userId, req.body.username, Date()], (error, response) => {
                if (error) {res.status(500).json({error})}
                if (req.body.userId !== req.userId || req.body.username !== req.username) {res.status(401).json({error : "Unauthorized request !"})}
                mysql.query('UPDATE post SET dislikes = dislikes + 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(201).json({message : "Post disliked !"})
                })
            })
        }

        if (response && req.body.dislikes == 0) {
            mysql.query('DELETE FROM dislikes WHERE userId = ? AND postId = ?', [req.body.userId, req.params.id], (error, response) => {
                if (error) {res.status(500).json({error})}
                if (req.body.userId !== req.userId || req.body.username !== req.username) {res.status(401).json({error : "Unauthorized request !"})}
                mysql.query('UPDATE post SET dislikes = dislikes - 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(200).json({message : "Dislike removed!"})
                })
            })
        }
    })
};

exports.postComments = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.body.userId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (req.userId != response[0].id || req.username !== response[0].username) {res.status(400).json({error : "Unauthorized request !"})}
        if (req.body.comment == "") {{res.status(400).json({message : "Write something in the comment !"})}}
        else {
            mysql.query('INSERT INTO comments (postId, userId, username, comment, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())', [req.params.id, req.body.userId, req.body.username, req.body.comment, Date()], (error, response) => {
                if (error) {res.status(500).json({error})}
                mysql.query('UPDATE post SET comments = comments + 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(200).json({message: "Comment created"})
                })
            })
        }
    })
};

exports.deleteComments = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.body.userId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (req.userId != response[0].id || req.username !== response[0].username) {res.status(400).json({error : "Unauthorized request !"})}
        else {
            mysql.query('DELETE FROM comments WHERE userId = ? AND postId = ?', [req.body.userId, req.params.id], (error, response) => {
                if (error) {res.status(500).json({error})} 
                mysql.query('UPDATE post SET comments = comments - 1 WHERE id = ?', req.params.id, (error, response) => {
                    if (error) {res.status(500).json({error})}
                    res.status(201).json({message: "Comment delete"})
                })
            }) 
        }
        
    })
};
