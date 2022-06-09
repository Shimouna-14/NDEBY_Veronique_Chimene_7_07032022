const mysql = require("../middleware/db-mysql")

exports.profile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response.length == []) {res.status(404).json({message : "This user doesn't exist"})}
        else res.status(200).json(response.map( (response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.allPost = (req, res, next) => {
    mysql.query('SELECT * FROM post WHERE userId = ? ORDER BY `date` asc', req.params.id, (error, response) => {
        if (error) {res.status(500).json({error})}
        else res.status(200).json(response.map( (response) => {
            if (response.image) {response.image = response.image.toString('utf8')}
            return response
        }))
    })
};

exports.modifyProfile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.userId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response[0].userId != req.userId ) { return res.status(403).json() }
        else{
            mysql.query('UPDATE user SET bio = ? WHERE id = ?', [req.body.bio, req.userId], (error, response) => {
                if (error) {res.status(500).json({error})}
                res.status(200).json({message : "The informations are saved !"})
            })
        }
    })
};


exports.deleteProfile = (req, res, next) => {
    mysql.query('SELECT * FROM user WHERE id = ?', req.userId, (error, response) => {
        if (error) {res.status(500).json({error})}
        if (response[0].userId != req.userId && req.isAdmin == false) {
            return res.status(403).json()
        }
        else {
            mysql.query('DELETE FROM user WHERE id = ?', req.userId, (error, response) => {
                if (error) {res.status(500).json({error})}
                else res.status(200).json({message : "User deleted !"})
            })
        }
    })
};