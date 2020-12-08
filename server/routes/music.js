const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()

router.post('/music/like',authMiddleware.checkAuth , musicController.like)
router.post('/music/fork',authMiddleware.checkAuth , musicController.fork)
router.post('/music',authMiddleware.checkAuth, musicController.createMusic)
router.post('/music/listen',authMiddleware.checkAuth , musicController.listen)

router.get('/music/full/:id', authMiddleware.checkAuth, musicController.getFullMusic)
router.get('/music/content/:id', authMiddleware.checkAuth, musicController.getMusicContent)
router.get('/music/mostLike',authMiddleware.checkAuth , musicController.mostLike)
router.get('/music/mostRecent',authMiddleware.checkAuth , musicController.mostRecent)
router.get('/music/mostFork',authMiddleware.checkAuth , musicController.mostFork)
router.get('/music/mostListen',authMiddleware.checkAuth , musicController.mostListen)

router.delete('/music/delete/:id', authMiddleware.checkAuth, musicController.deleteMusic)

module.exports = router
