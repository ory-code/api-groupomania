const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCommentCtrl = require("../controllers/likeComment");
const commentCtrl = require("../controllers/comment");

router.get("/", auth, commentCtrl.getAllComment); //auth
router.get("/:id", auth, commentCtrl.getOneComment); //auth
router.post("/", auth, commentCtrl.createComment); //auth
router.post("/:id/like", auth, likeCommentCtrl.likeComment);
router.put("/:id", auth, commentCtrl.updateComment); //auth
router.delete("/:id", auth, commentCtrl.deleteComment); //auth

module.exports = router;
