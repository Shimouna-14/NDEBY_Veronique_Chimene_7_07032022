const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const limiter = require("../middleware/limiter")
const auth = require("../middleware/auth")

router.post("/auth/login", limiter, adminCtrl.login);
router.get("/logout", adminCtrl.logout);
router.get("/home", auth, adminCtrl.allPost);
router.get("/status/:id", auth, adminCtrl.onePost);
router.delete("/status/:id", auth, adminCtrl.deletePost);
router.get("/status/:id/comments", auth, adminCtrl.comments);
router.delete("/comments/:id", auth, adminCtrl.deleteComments);
router.get("/profile/:id", auth, adminCtrl.oneProfile);
router.get("/profile/status/:id", auth, adminCtrl.postProfile);
router.delete("/profile/:id", auth, adminCtrl.deleteProfile);

module.exports = router;