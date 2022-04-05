const mysql = require("../middleware/db-mysql")
const fs = require("fs");

exports.profile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(404).json({error : "This user doesn't exist"})} 
        res.status(200).json(response)
    })
};

exports.modifyProfile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(404).json({error : "This user doesn't exist"})} 
        if (req.userId !== response[0].id || req.username !== response[0].username) {res.status(400).json({error : "Unauthorized request !"})}
        else {
            if (req.file) {
                if (response[0].image.toString() == null) {
                    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    mysql.query('UPDATE user SET image = ?, bio = ? WHERE id = ?', [image, req.body.bio, req.params.id], (error, response) => {
                        if (error) {res.status(500).json({error})}
                        res.status(200).json({message : "The informations are saved !"})
                    })
                } else {
                    let image = response[0].image.toString()
                    let oldFilename = image.split('/images/')[1];
                    fs.unlink(`images/${oldFilename}`, () => {
                        let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        mysql.query('UPDATE user SET image = ?, bio = ? WHERE id = ?', [image, req.body.bio, req.params.id], (error, response) => {
                            if (error) {res.status(500).json({error})}
                            res.status(200).json({message : "The informations are saved !"})
                        })
                    })
                }
            } else {
                mysql.query('UPDATE user SET bio = ? WHERE id = ?', [req.body.bio, req.params.id], (error, response) => {
                    if (error) {res.status(500).json({error})} 
                    res.status(200).json({message : "The informations are saved !"})
                })
            }
        }
    })
};

exports.deleteProfile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})} 
        if (response.length == []) {res.status(404).json({error : "This user doesn't exist"})} 
        if (req.userId !== response[0].id || req.username !== response[0].username) {res.status(400).json({error : "Unauthorized request !"})}
        else {
            mysql.query('SELECT * FROM post WHERE userId = ?', req.params.id, (error, response) => {
                if (error) {res.status(500).json({error})}
                else {
                    if (response.length == []) {if (error) {res.status(500).json({error})}}
                    else if (response[0].image == null) {
                        let image = response[0].image.toString()
                        let filename = image.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            mysql.query('DELETE FROM post WHERE userId = ? AND image = ?', [req.params.id, image], (error, response) => {
                                if (error) {res.status(500).json({error})}
                            })
                        })
                    } else {
                        mysql.query('DELETE FROM post WHERE userId = ?', req.params.id, (error, response) => {
                            if (error) {res.status(500).json({error})}
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
