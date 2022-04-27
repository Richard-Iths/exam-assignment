const express = require('express')
const { postAuthenticateUser } = require('../controllers/auth')
const { authValidation } = require('../middlewares/inputValidations')
const router = express.Router()

router.post('/', authValidation, postAuthenticateUser)

module.exports = router
