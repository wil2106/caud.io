const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const apiRouter = require('./routes/routes.js')
const cors = require('cors')
const { handleErrors } = require('./middlewares/errorMiddleware')

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

app.use('/api/', apiRouter)

// Use error handling middleware
app.use(handleErrors)

module.exports = app
