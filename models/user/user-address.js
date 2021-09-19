const mongoose = require('mongoose')
const { Schema } = mongoose

const userAddressSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
  mobile: { type: String, require: true, default: '' },
  streetAddress: { type: String, require: true, default: '' },
  city: { type: String, require: true, default: '' },
  Governorate: { type: String, require: true, default: '' },
})

module.exports = mongoose.model('UserAddress', userAddressSchema)
