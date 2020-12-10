const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const userController = require('../controllers/user')


const router = Router()
router.delete('/user/delete/:id', authMiddleware.checkAuth, userController.deleteUser)
router.put('/user/update/:id',authMiddleware.checkAuth , userController.updateUser)

module.exports = router