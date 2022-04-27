const { BaseError } = require('../models/errors')

module.exports = (err, _, res, _next) => {
  if (err instanceof BaseError && process.env.NODE_ENV === 'production') {
    return res.status(err._statusCode).json({
      data: {
        error: err.message,
      },
    })
  }

  return res.status(err._statusCode ?? 500).json({
    error: {
      message: err.message,
      stack: err.stack,
    },
  })
}
