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
    const error = new HttpError({ message: 'Signing up failed!', code: 500 })
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
    const error = new HttpError({ message: 'Signing up failed!', code: 500 })
    return next(error)
  }

  let token
  try {
    token = await jwt.sign(
      {
        userId: createdUser.id,
        isAdmin: createdUser.isAdmin,
      },
      process.env.JWT_KEY
    )
  } catch (err) {
    const error = new HttpError({ message: 'Signing up failed!', code: 500 })
    return next(error)
  }

  delete createdUser._doc.password
  delete createdUser._doc.__v

  res.status(201).json({ user: { ...createdUser._doc, token } })
}

const signin = async (req, res, next) => {
  let { email, password } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new HttpError({ message: 'invalid input passed', code: 422 })
    return next(error)
  }

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError({ message: 'Signing in failed!', code: 500 })
    return next(error)
  }

  if (!existingUser) {
    const error = new HttpError({
      message: 'This user is not exist, please create account',
      code: 401,
    })
    return next(error)
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    const error = new HttpError({
      message: 'Could not log you in, please try again!',
      code: 500,
    })
    return next(error)
  }

  if (!isValidPassword) {
    const error = new HttpError({
      message: 'Incorrect password',
      code: 401,
    })
    return next(error)
  }

  let token
  try {
    token = await jwt.sign(
      {
        userId: existingUser.id,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_KEY
    )
  } catch (err) {
    const error = new HttpError({ message: 'Signing up failed!', code: 500 })
    return next(error)
  }

  delete existingUser._doc.password
  delete existingUser._doc.__v

  res.status(201).json({ user: { ...existingUser._doc, token } })
}

const editProfileInfo = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    streetAddress,
    city,
    Governorate,
  } = req.body

  const { userId } = req.userData

  let user
  try {
    user = await User.findById(userId).select('-password -isAdmin')
  } catch (err) {
    const error = new HttpError({
      message: 'Edit information failed!',
      code: 500,
    })
    return next(error)
  }

  user.firstName = firstName
  user.lastName = lastName
  user.email = email
  user.mobile = mobile
  user.streetAddress = streetAddress
  user.city = city
  user.Governorate = Governorate

  try {
    await user.save()
  } catch (err) {
    const error = new HttpError({
      message: 'Edit information failed!',
      code: 500,
    })
    return next(error)
  }

  res.status(200).json({ user })
}

const getUsers = async (req, res, next) => {
  let users

  try {
    users = await User.find({}).select('-password')
  } catch (err) {
    const error = new HttpError({
      message: 'Cant get users, please try again later!',
      code: 500,
    })
    return next(error)
  }

  res.status(200).json({ users })
}

exports.createUser = createUser
exports.signin = signin
exports.editProfileInfo = editProfileInfo
exports.getUsers = getUsers
