const express = require('express') 
const router = express.Router() 
const auth = require('../middleware/auth') 
const profileCtrl = require('../controllers/profile') 
 const multer = require('../middleware/multer-config') 

router.get('/:userid', auth, profileCtrl.userProfile) 
router.put('/:userid', auth,multer, profileCtrl.updateProfile) 
router.delete('/:userid', auth, profileCtrl.deleteProfile) 

module.exports = router //On exporte notre router pour l'importer dans app.js