const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  name: { type: String, require: true },
  products: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Product' }],
})

module.exports = mongoose.model('Category', categorySchema)
