const Router = require('express').Router
const authRouter = require('./auth.js')
const sampleRouter = require('./sample.js')
const musicRouter = require('./music.js')
const libraryRouter = require('./library.js')
const userRouter = require('./user')

const router = Router()
router.use('/', authRouter)
router.use('/', sampleRouter)
router.use('/', musicRouter)
router.use('/', libraryRouter)
router.use('/', userRouter)
router.use('/test', (req, res) => res.send('hello world'))

module.exports = router