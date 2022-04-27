require('dotenv').config()
const express = require('express')
const { log } = require('./utils/logger')()
const errorMiddleware = require('./middlewares/error')
const authRoutes = require('./routes/auth')
const app = express()
const PORT = process.env.PORT ?? 4001
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
app.use(errorMiddleware)
app.listen(PORT, () => {
  log.info('starting server', `server is running on port:${PORT}`)
})
