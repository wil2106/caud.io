/**
 * @class GeneralError
 * @description Custom error class used to handle backend error responses
 */
class GeneralError extends Error {
  constructor(message) {
    super()
    this.message = message
    this.code = null

    this.setCode()
  }

  setCode() {
    if (this instanceof BadRequest) {
      this.code = 400
      return
    } else if (this instanceof NotFound) {
      this.code = 404
      return
    }
    this.code = 500
  }
}

/**
 * @class BadRequest
 * @description Abstract class for bad requests
 */
class BadRequest extends GeneralError {}

/**
 * @class NotFound
 * @description Abstract class for data not found
 */
class NotFound extends GeneralError {}

/**
 * @exports
 */
module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
}
