const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

router.get("/:id", auth, profileCtrl.profile);
router.get("/status/:id", auth, profileCtrl.allPost);
router.put("/:id", auth, multer, profileCtrl.modifyProfile);
router.delete("/:id", auth, profileCtrl.deleteProfile);

module.exports = router
