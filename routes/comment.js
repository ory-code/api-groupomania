const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCommentCtrl = require("../controllers/likeComment");
const commentCtrl = require("../controllers/comment");

router.get("/", auth, commentCtrl.getAllComment);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/", auth, commentCtrl.createComment);
router.post("/:id/like", auth, likeCommentCtrl.likeComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
