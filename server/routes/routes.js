const Router =  require('express').Router
const authRouter = require('./auth.js') 
const sampleRouter = require('./sample.js') 
const musicRouter = require('./music.js') 

const router = Router()
router.use('/', authRouter)
router.use('/', sampleRouter)
router.use('/', musicRouter)
router.use('/test', (req, res)=> res.send('hello world'))

module.exports = router
