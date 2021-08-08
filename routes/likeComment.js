const express = require('express') 
const router = express.Router() 
const auth = require('../middleware/auth') 

const likeCtrl = require('../controllers/likeComment') 

router.get('/like/:commentid/:userid', auth, likeCtrl.likeComment) 
router.get('/dislike/:commentid/:userid', auth, likeCtrl.dislikeComment) 

module.exports = router 