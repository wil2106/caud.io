const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()

router.post('/music/like',authMiddleware.checkAuth , musicController.like)
router.post('/music/fork',authMiddleware.checkAuth , musicController.fork)
router.post('/music',authMiddleware.checkAuth, musicController.createMusic)
router.post('/music/listen',authMiddleware.checkAuth , musicController.listen)


router.get('/music/list', musicController.getListOfMusic)
router.get('/music/full/:id', musicController.getFullMusic)
router.get('/music/mostLike', musicController.mostLike)
router.get('/music/mostRecent', musicController.mostRecent)
router.get('/music/mostFork', musicController.mostFork)
router.get('/music/content/:id', musicController.getMusicContent)
router.get('/music/mostListen', musicController.mostListen)
router.get('/music/searchTitle/:search', musicController.searchTitle)

router.delete('/music/delete/:id', authMiddleware.checkAuth, musicController.deleteMusic)

router.put('/music/update/:id',authMiddleware.checkAuth , musicController.updateMusic)





module.exports = router
