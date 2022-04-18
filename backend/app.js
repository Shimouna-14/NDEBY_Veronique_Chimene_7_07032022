const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path")
require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use("/api/auth", userRoutes);
app.use("/api/home", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;