const Router =  require('express').Router
const authRouter = require('./auth.js') 
const sampleRouter = require('./sample.js') 

const router = Router()
router.use('/', authRouter)
router.use('/', sampleRouter)

module.exports = router