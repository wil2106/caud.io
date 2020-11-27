const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()
<<<<<<< HEAD
router.post('/music', authMiddleware.checkAuth, musicController.createMusic)
=======
router.post('/music',authMiddleware.checkAuth, musicController.createMusic)
>>>>>>> 400f73cddf25e1780a9d1240c36d507a95b9cd93

module.exports = router
