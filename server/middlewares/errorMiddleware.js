const { GeneralError } = require('./errorClass')

/**
 * @function handleErrors
 * @description Error handling express middleware
 * @param {Object} err 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next
 * @returns res Object 
 */
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

/**
 * @function wrapAsync
 * @param {function} fn
 * @description async wrapper to catch exceptions from async/await functions 
 */
exports.wrapAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next)
}
