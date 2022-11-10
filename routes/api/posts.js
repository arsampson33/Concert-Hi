const express = require('express')
const router = express.Router()
const postsCtrl = require('../../controllers/api/posts')


router.post('/', postsCtrl.createPost)
router.put('/:id', postsCtrl.updatePost)
router.delete('/:id', postsCtrl.deletePost)
router.get('/:id', postsCtrl.getPost)
router.get('/:timeline/:userId',postsCtrl.getTLPost)
router.put('/:id/like', postsCtrl.likePost)







module.exports = router