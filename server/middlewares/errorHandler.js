const { Error: SequelizeError } = require('sequelize')
const { AssertionError } = require('assert')
const UserError = require()

exports.wrapAsync = (fn) => {
  return function (req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next)
  }
}

exports.databaseErrorHandler = (error, req, res, next) => {
  if (error instanceof SequelizeError) {
    return res.status(503).json({
      type: error.name,
      message: error.message,
    })
  }
  next(error)
}

exports.assertionErrorHandler = (error, req, res, next) => {
  if (error instanceof AssertionError) {
    return res.status(400).json({
      type: 'AssertionError',
      message: error.message,
    })
  }
  next(error)
}

exports.userErrorHandler = (error, req, res, next) => {
  if (error instanceof UserError) {
    return res.status()
  }
}
