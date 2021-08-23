const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const profilCtrl = require("../controllers/profil");
const multer = require("../middleware/multer-config");

router.get("/:id",auth,  profilCtrl.getProfil); 
router.put("/:id", auth, multer, profilCtrl.updateProfil); 
router.delete("/:id", auth,profilCtrl.deleteProfil); 

module.exports = router;
