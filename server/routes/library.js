const Router = require('express').Router
const authMiddleware = require('../middlewares/auth')
const libraryController = require('../controllers/library')


const router = Router()
router.get('/libraries',authMiddleware.checkAuth ,libraryController.getLibraries);
router.post('/library',authMiddleware.checkAuth ,libraryController.addLibrary);

module.exports = router
