const express = require('express') 
const router = express.Router() 
const auth = require('../middleware/auth') 

const commentCtrl = require('../controllers/comment') 

router.get('/post/:postid', auth, commentCtrl.getAllComment) 
router.get('/:commentid', auth, commentCtrl.getOneComment) 
router.post('/:postid', auth, commentCtrl.createComment) 
router.put('/:commentid', auth, commentCtrl.updateComment)
router.delete('/:commentid', auth, commentCtrl.deleteComment)

module.exports = router 