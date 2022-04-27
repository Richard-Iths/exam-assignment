import 'reflect-metadata'
import express from 'express'
import log from './utils/logger'
import ordersRoutes from './routes/orders'
const app = express()
const PORT = process.env.PORT ?? 4002

app.use(express.json())
app.use('/api/v1/orders', ordersRoutes)
;(async () => {
  try {
    log.info('server.ts', 'initializing server')
    app.listen(PORT, () => {
      log.info('server running', `server is running on port: ${PORT}`)
    })
  } catch (err) {
    log.error('server.ts', 'error when initializing', err)
  }
})()
