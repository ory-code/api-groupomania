const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const postCtrl = require("../controllers/post");
const likePostCtrl = require("../controllers/likePost")
//const auth = require("../middleware/auth");

router.post("/",  multer, postCtrl.createPost); //auth multer
router.post("/:id/like",likePostCtrl.likePost) //auth
router.get("/",  postCtrl.getAllPost); //auth
router.get("/:id",  postCtrl.getOnePost); //auth
router.put("/:id",  multer, postCtrl.updatePost); //auth multer
router.delete("/:id", postCtrl.deletePost); //auth

module.exports = router;
