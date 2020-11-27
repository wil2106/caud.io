const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()
router.post('/music', authMiddleware.checkAuth, musicController.createMusic)

module.exports = router
