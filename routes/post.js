const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const postCtrl = require("../controllers/post");
const likePostCtrl = require("../controllers/likePost");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, likePostCtrl.likePost);
router.post("/:id/dislike", auth, likePostCtrl.dislikePost);
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
