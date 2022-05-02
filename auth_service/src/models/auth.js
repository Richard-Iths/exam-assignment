const userServiceConnection = require('../db/usersService')
const { log } = require('../utils/logger')()
const argon2 = require('argon2')
var jwt = require('jsonwebtoken')

const getUserByUsername = async (username) => {
  log.info('model/auth/getUserByUsername', 'getting user by username', username)
  const client = await userServiceConnection()
  try {
    const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [username])
    await client.end()
    return rows[0]
  } catch (err) {
    log.error('model/auth/getUserByUsername', 'db query failed', err)
    throw err
  } finally {
    if (client) {
      await client.end()
    }
  }
}

const authenticateUser = async (hashedPassword, comparePassword) => {
  log.info('model/auth/authenticateUser', 'comparing passwords with argon')
  try {
    if (await argon2.verify(hashedPassword, comparePassword)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    log.error('model/auth/authenticateUser', 'argon2 failed', err)
    throw err
  }
}
const createJsonWebToken = ({ id, user_role }) => {
  try {
    log.info('model/auth/createJsonWebToken', 'creating jwt token', id, user_role)
    return jwt.sign({ id, role: user_role }, process.env.JWT_SECRET ?? 'secret', {
      expiresIn: process.env.JWT_EXPIRES ?? '8h',
    })
  } catch (err) {
    log.error('model/auth/createJsonWebToken', 'creating jwt token failed', err)
    throw err
  }
}
module.exports = {
  getUserByUsername,
  authenticateUser,
  createJsonWebToken,
}
