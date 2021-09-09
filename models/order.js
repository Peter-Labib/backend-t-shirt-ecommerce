const mongoose = require('mongoose')

const { Schema } = mongoose

const orderSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    orderItems: [
      { type: mongoose.Types.ObjectId, require: true, ref: 'Product' },
    ],
    shippingAddress: {
      mobile: { type: String, require: true },
      streetAddress: { type: String, require: true },
      city: { type: String, require: true },
      Governorate: { type: String, require: true },
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updateTime: { type: String },
      emailAddress: { type: String },
    },
    taxPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      require: true,
      default: false,
    },
    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
