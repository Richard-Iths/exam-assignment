class BaseError extends Error {
  constructor(message, statusCode) {
    super(message)
    this._statusCode = statusCode
  }
  get statusCode() {
    return this.statusCode
  }
}

class InvalidRequest extends BaseError {
  constructor(message) {
    super(message, 406)
  }
}

module.exports = {
  BaseError,
  InvalidRequest,
}
