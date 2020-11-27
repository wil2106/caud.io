const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()

router.post('/music/like',authMiddleware.checkAuth , musicController.like)
router.post('/music',authMiddleware.checkAuth, musicController.createMusic)
router.post('/music/listen',authMiddleware.checkAuth , musicController.listen)

router.get('/music/mostLike',authMiddleware.checkAuth , musicController.mostLike)
router.get('/music/mostRecent',authMiddleware.checkAuth , musicController.mostRecent)
router.get('/music/mostFork',authMiddleware.checkAuth , musicController.mostFork)
router.get('/music/mostListen',authMiddleware.checkAuth , musicController.mostListen)

module.exports = router
