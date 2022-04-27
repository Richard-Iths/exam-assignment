const { log } = require('../utils/logger')()
const authValidation = (req, _, next) => {
  const { username = '', password = '' } = req.body
  log.info('middelwares/authValidation', 'running validation on user input', username, password)
  try {
    if (!username || !password) {
      throw new Error('username and password are required')
    }
    next()
  } catch (err) {
    log.error('middelwares/authValidation', 'error when validating user input', err)
    next(err)
  }
}

module.exports = {
  authValidation,
}
