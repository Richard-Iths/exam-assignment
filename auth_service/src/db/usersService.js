const { log } = require('../utils/logger')()
const { Client } = require('pg')
const initDbClient = async () => {
  try {
    log.info('creating new pg client')
    const client = new Client()
    await client.connect()
    return client
  } catch (err) {
    log.error('/db/users_service', 'failed to connect to database')
    throw err
  }
}

module.exports = initDbClient
