import log from 'npmlog'

const loggerInit = (): log.Logger => {
  if (process.env.NODE_ENV === 'production') {
    log.level = 'error'
  } else {
    log.level = 'all'
  }

  return log
}

export default loggerInit()
