const app = require('./App')
const config = require('./config')

app.listen(process.env.PORT || config.port, () =>
  console.log('App listening on port' + config.port)
)