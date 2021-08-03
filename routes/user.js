const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup",  userCtrl.signup); //auth, 
router.post("/login", userCtrl.login); //auth

module.exports = router;
