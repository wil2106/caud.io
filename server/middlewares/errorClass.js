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

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
}
