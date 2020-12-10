const { GeneralError } = require('./errorClass')

exports.handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.code).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  })
}

exports.wrapAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next)
}
