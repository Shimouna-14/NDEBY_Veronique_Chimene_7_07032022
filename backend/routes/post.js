const express = require("express")
const router = express.Router()
const postCtrl = require("../controllers/post")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

router.get("/", auth, postCtrl.allPost);
router.get("/status/:id", auth, postCtrl.onePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/status/:id", auth, multer, postCtrl.modifyPost);
router.delete("/status/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;