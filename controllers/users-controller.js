const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new HttpError({ message: 'invalid input passed', code: 422 })
    return next(error)
  }

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError({
      message: 'Signing up failed',
      code: 500,
    })
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError({ message: 'User exists already', code: 422 })
    return next(error)
  }

  let encryptPassword
  try {
    encryptPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    const error = new HttpError({ message: 'Signing up failed', code: 500 })
    return next(error)
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: encryptPassword,
    reviews: [],
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError({ message: 'Signing up failed', code: 500 })
    return next(error)
  }

  let token

  try {
    token = await jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY
    )
  } catch (err) {
    const error = new HttpError({ message: 'Signing up failed', code: 500 })
    return next(error)
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token })
}

exports.createUser = createUser
