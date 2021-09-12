const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
  name: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, require: true },
  image: {
    main: { type: String, require: true },
    secondary: { type: String, require: true },
    tertiary: { type: String, require: true },
  },
  descrioption: { type: String, require: true },
  rating: { type: Number, require: true, default: 0 },
  numReviews: { type: Number, require: true, default: 0 },
  reviews:[{ type: mongoose.Types.ObjectId, ref:'Review'}],
  countInStock: {
    XS: { type: Number, require: true, default: 0 },
    S: { type: Number, require: true, default: 0 },
    M: { type: Number, require: true, default: 0 },
    Lg: { type: Number, require: true, default: 0 },
    XL: { type: Number, require: true, default: 0 },
    XXL: { type: Number, require: true, default: 0 },
  },
})

module.exports = mongoose.model('Product', productSchema)
