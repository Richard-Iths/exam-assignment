const { log } = require('../utils/logger')()
const { getUserByUsername, authenticateUser, createJsonWebToken } = require('../models/auth')
const { InvalidRequest } = require('../models/errors')
const postAuthenticateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    log.info('controllers/auth/authenticateUser', 'running user authentication', username, password)
    const existingUser = await getUserByUsername(username)
    console.log(existingUser, 'existingUser')
    const isPasswordMatch = existingUser ? await authenticateUser(existingUser.password, password) : null
    if (!existingUser || !isPasswordMatch) {
      throw new InvalidRequest('username or password mismatch')
    }
    const jwtToken = createJsonWebToken(existingUser)
    return res.json({ data: { jwtToken } })
  } catch (err) {
    log.error('controllers/auth/authenticateUser', 'controller error', err)
    next(err)
  }
}

module.exports = {
  postAuthenticateUser,
}
