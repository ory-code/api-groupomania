const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/posts", auth, multer, postCtrl.createPost);
// router.get("/", postCtrl.getAllPost);
// router.get("/:id", postCtrl.getOnePost);
// router.put("/:id",multer, postCtrl.updatePost);
// router.delete(":id", postCtrl.deletePost);

module.exports = router;
