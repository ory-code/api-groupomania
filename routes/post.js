const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");


router.post("/posts", postCtrl.createPost);
// router.get("/", postCtrl.getAllPost);
// router.get("/:id", postCtrl.getOnePost);
// router.put("/:id", postCtrl.updatePost);
// router.delete(":id", postCtrl.deletePost);

module.exports = router
