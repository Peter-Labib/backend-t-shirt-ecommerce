const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, require: true, ref: 'Product' },
    user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    rate: { type: Number, require: true, },
    title: { type: String, require: true },
    comment: { type: String, require: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
