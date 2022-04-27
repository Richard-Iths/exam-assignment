const log = require('npmlog')
module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    log.level = 'error'
  } else {
    log.level = 'all'
  }

  return { log }
}
