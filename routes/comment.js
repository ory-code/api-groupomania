const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment")

router.get("/:id/comments", auth, commentCtrl.getAllComments);
router.get("/:id/comments/:id", auth, commentCtrl.getOneComment);
router.put("/:id/comments/:id", auth, commentCtrl.updateComment);
router.delete("/:id/comments/:id", auth, commentCtrl.deleteComment);
router.post("/:id/comments", auth, commentCtrl.createComment);


module.exports = router;
