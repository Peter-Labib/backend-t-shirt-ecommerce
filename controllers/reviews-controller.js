const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Review = require('../models/review')
const Product = require('../models/review')

const createReview = async (req, res, next) => {
  const { rate, title, comment } = req.body

  let product
  let user
  try {
    product = Product.findById(req.params.pid)
    user = Product.findById(req.userData.userId)
  } catch (err) {
    const error = new HttpError({
      message: 'Server error, please try again later!',
      code: 500,
    })
    return next(error)
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.creator.toString() == user.id
  )

  if (alreadyReviewed) {
    const error = new HttpError({
      message: 'Product already reviewed',
      code: '400',
    })
    return next(error)
  }

  const createReview = new Review({
    product,
    user,
    rate,
    title,
    comment,
  })

  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await createReview.save({ session })
    product.reviews.push(createReview)
    user.reviews.push(createReview)
    await user.save({ session })
    await product.save({ session })
    await session.commitTransaction()
  } catch (err) {
    const error = new HttpError({
      message: "Server error couldn't create review, please try again later!",
      code: 500,
    })
    return next(error)
  }
}

const editReview = async (req, res, next) => {
  const { rate, title, comment } = req.body

  try {
    await Review.findByIdAndUpdate(req.params.rid, { rate, title, comment })
  } catch (err) {
    const error = new HttpError({
      message: "Server error couldn't update review, please try again later!",
      code: 500,
    })
    return next(error)
  }
}

exports.createReview = createReview
exports.editReview = editReview
