const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: true, default: false },
  address: { type: mongoose.Types.ObjectId, require: true, ref: 'UserAddress' },
  reviews: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Review' }],
  orders: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Order' }],
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
