const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth

const likeCtrl = require('../controllers/likePost') //On importes nos controllers like

router.get('/like/:postid/:userid', auth, likeCtrl.likePost) //On like un post
router.get('/dislike/:postid/:userid', auth, likeCtrl.dislikePost) //On dislike un post

module.exports = router //On exporte notre router pour l'importer dans app.js