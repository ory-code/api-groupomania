const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth");
const likeCommentCtrl = require("../controllers/likeComment")
const commentCtrl = require("../controllers/comment");

router.get("/", commentCtrl.getAllComment); //auth
router.get("/:id", commentCtrl.getOneComment); //auth
router.post("/", commentCtrl.createComment); //auth
router.post("/:id/like", likeCommentCtrl.likeComment)
router.put("/:id", commentCtrl.updateComment); //auth
router.delete("/:id", commentCtrl.deleteComment); //auth

module.exports = router;
