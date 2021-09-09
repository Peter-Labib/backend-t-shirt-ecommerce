const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    productId: { type: mongoose.Types.ObjectId, require: true, ref: 'Product' },
    creator: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    rateing: { type: Number, require: true },
    title: { type: String, require: true },
    comment: { type: String, require: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
