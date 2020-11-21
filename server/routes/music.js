const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()

router.get('/music/mostLike',authMiddleware.checkAuth , musicController.mostLike)
router.get('/music/mostRecent',authMiddleware.checkAuth , musicController.mostRecent)
router.get('/music/mostFork',authMiddleware.checkAuth , musicController.mostFork)
router.get('/music/mostListen',authMiddleware.checkAuth , musicController.mostListen)

module.exports = router
