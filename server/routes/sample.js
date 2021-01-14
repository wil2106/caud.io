const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const sampleController = require('../controllers/sample')

const router = Router()
router.get('/samples', sampleController.getSamples)
router.get('/samples/:id', sampleController.getSample)
router.post('/sample', authMiddleware.checkAuth, sampleController.addSample)

module.exports = router
