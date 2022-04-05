const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const limiter = require("../middleware/limiter")
const auth = require("../middleware/auth")

router.post("/auth/signup", adminCtrl.signup);
router.post("/auth/login", limiter, adminCtrl.login);
router.get("/home/", auth, adminCtrl.allPost);
router.get("/home/status/:id", auth, adminCtrl.onePost);
router.delete("/home/status/:id", auth, adminCtrl.deletePost);
router.get("/profile/:id", auth, adminCtrl.oneProfile);
router.delete("/profile/:id", auth, adminCtrl.deleteProfile);

module.exports = router;