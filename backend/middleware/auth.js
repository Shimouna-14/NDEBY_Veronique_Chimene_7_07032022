const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        const username = decodedToken.username;
        const adminId = decodedToken.adminId;
        const isAdmin = decodedToken.isAdmin;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            req.userId = userId;
            req.username = username;
            req.adminId = adminId;
            req.isAdmin = isAdmin
            next();
        }
    }
    catch {res.status(403).json({ error: "Unauthorized requets"});
    }
};