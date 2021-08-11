const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

router.post("/", postCtrl.createPost); //auth
// router.get("/", postCtrl.getAllPost);  //auth
router.get("/:id", postCtrl.getOnePost); //auth
// router.put("/:id",multer, postCtrl.updatePost); //auth
// router.delete(":id", postCtrl.deletePost); //auth

module.exports = router;
