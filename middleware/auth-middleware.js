const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

const checkAuthUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      const error = new HttpError({
        message: 'Authentication failed, no token!',
        code: 401,
      })
      return next(error)
    }

    const decodeToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = { userId: decodeToken.userId, isAdmin: decodeToken.isAdmin }
    next()
  } catch (err) {
    const error = new HttpError({
      message: 'Authentication failed!',
      code: 401,
    })
    return next(error)
  }
}

checkAuthAdmin = (req, res, next) => {
  const { isAdmin } = req.userData

  if (!!isAdmin) {
    next()
  } else {
    const error = new HttpError({
      message: 'Authentication failed as an admin',
      code: 401,
    })
    return next(error)
  }
}

exports.checkAuthUser = checkAuthUser
exports.checkAuthAdmin = checkAuthAdmin
