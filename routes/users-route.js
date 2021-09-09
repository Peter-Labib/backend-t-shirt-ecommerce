const express = require('express')
const { check } = require('express-validator')

const usersController = require('../controllers/users-controller')

const router = express.Router()

router.post(
  '/signup',
  [
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('password').notEmpty(),
    check('email').isEmail(),
  ],
  usersController.createUser
)

module.exports = router
