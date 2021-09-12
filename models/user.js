const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  mobile: { type: String, require: true, default:'' },
  streetAddress: { type: String, require: true, default:'' },
  city: { type: String, require: true, default:'' },
  Governorate: { type: String, require: true, default:'' },
  reviews: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Review' }],
  isAdmin: { type: Boolean, require: true, default: false },
  orders: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Order' }],
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
