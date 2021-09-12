const express = require('express')
const { body } = require('express-validator')

const usersController = require('../controllers/users-controller')
const { checkAuth, checkAdmin } = require('../middleware/auth-middleware')

const router = express.Router()

router.post(
  '/signup',
  [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('password').isLength({ min: 5 }),
    body('email').isEmail(),
  ],
  usersController.createUser
)

router.post(
  '/signin',
  [body('email').isEmail(), body('password').isLength({ min: 5 })],
  usersController.signin
)

// a middleware to check token validation
router.use(checkAuth)

router.patch('/profile',usersController.editProfileInfo)

router.use(checkAdmin)

router.get('/', usersController.getUsers)

module.exports = router
