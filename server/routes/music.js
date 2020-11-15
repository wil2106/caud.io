const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()
router.post('/music',  musicController.createMusic)
router.post('/music/like', musicController.like)
router.post('/music/listen', musicController.listen)
router.post('/music/delete', musicController.deleteMusic)

router.get('/music/topLike', musicController.topLike)

module.exports = router

