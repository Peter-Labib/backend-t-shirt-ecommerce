const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
  name: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, require: true, ref: 'Category' },
  price: { type: Number, require: true },
  image: {
    main: { type: String, require: true },
    secondary: { type: String, require: true },
    tertiary: { type: String, require: true },
  },
  description: { type: String, require: true },
  rating: { type: Number, require: true, default: 0 },
  numReviews: { type: Number, require: true, default: 0 },
  reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
  inventory: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'Inventory',
  },
})

module.exports = mongoose.model('Product', productSchema)
