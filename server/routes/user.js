const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const userController = require('../controllers/user')

const router = Router()
router.get('/user/:id', authMiddleware.checkAuth, userController.getUser)
router.get(
  '/user/:id/musicIDs',
  authMiddleware.checkAuth,
  userController.getUserMusicIDs
)
router.delete(
  '/user/delete',
  authMiddleware.checkAuth,
  userController.deleteUser
)
router.put(
  '/user/update/:id',
  authMiddleware.checkAuth,
  userController.updateUser
)

module.exports = router
