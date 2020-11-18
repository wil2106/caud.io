const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const musicController = require('../controllers/music')


const router = Router()
router.post('/music',  musicController.createMusic)

module.exports = router

