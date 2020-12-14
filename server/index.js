const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const apiRouter = require('./routes/routes.js')
const cors = require('cors')
const { handleErrors } = require('./middlewares/errorMiddleware')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

app.use('/api/', apiRouter)

// Use error handling middleware
app.use(handleErrors)
app.listen(process.env.PORT || config.port, () =>
  console.log('App listening on port ' + config.port)
)
