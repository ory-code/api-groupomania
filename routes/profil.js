const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const profilCtrl = require("../controllers/profil");
const multer = require("../middleware/multer-config");

router.get("/:id",  profilCtrl.getProfil); //auth
router.put("/:id",  multer, profilCtrl.updateProfil); //auth
router.delete("/:id", profilCtrl.deleteProfil); //auth

module.exports = router;
