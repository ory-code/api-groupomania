const express = require('express') 
const router = express.Router() 
const auth = require('../middleware/auth') 

const likeCtrl = require('../controllers/likePost') 

//router.post('/:id/like', auth, likeCtrl.likePost) 
//router.post('/:id/dislike', auth, likeCtrl.dislikePost)

module.exports = router 