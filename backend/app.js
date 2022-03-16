const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path")
require("dotenv").config();

const userRoutes = require("./routes/user");

app.use((res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next()
});

app.use(bodyParser.json());
app.use(helmet());
app.use("/api/auth", userRoutes);

module.exports = app;