const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.createPost); 
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
