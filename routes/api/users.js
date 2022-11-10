const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.login)
router.put('/:id' ,usersCtrl.update)
router.delete('/:id', usersCtrl.deleteUser)
router.get('/', usersCtrl.findUser)
router.put('/:id/follow', usersCtrl.follow)
router.put('/:id/unfollow', usersCtrl.unfollow)

module.exports = router







