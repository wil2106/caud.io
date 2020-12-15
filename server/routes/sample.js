const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const sampleController = require('../controllers/sample')

const router = Router()
router.get('/samples', authMiddleware.checkAuth, sampleController.getSamples)
router.get('/samples/:id', authMiddleware.checkAuth, sampleController.getSample)
router.post('/samples', authMiddleware.checkAuth, sampleController.addSample)

module.exports = router
