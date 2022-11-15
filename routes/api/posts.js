const express = require('express')
const router = express.Router()
const postsCtrl = require('../../controllers/api/posts')



router.post('/', postsCtrl.createPost)
router.put('/:id', postsCtrl.updatePost)
router.put('/:id/comment', postsCtrl.comment)
router.delete('/:id', postsCtrl.deletePost)
router.get('/:id', postsCtrl.getPost)
router.get('/:timeline/:userId',postsCtrl.getTLPost)
router.get('/concert/:concertId/all',postsCtrl.getConcertPost)
router.get('/concert/following/:userId/all',postsCtrl.getConcertFollowPost)
router.get('/user/:userId/all',postsCtrl.getUserPost)
router.put('/:id/like', postsCtrl.likePost)







module.exports = router