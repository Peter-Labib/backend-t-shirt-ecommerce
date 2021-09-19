const mongoose = require('mongoose')

const { Schema } = mongoose

const orderSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: {
          xs: { type: Number },
          s: { type: Number },
          m: { type: Number },
          lg: { type: Number },
          xl: { type: Number },
          xxl: { type: Number },
        },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Types.ObjectId,
          require: true,
          ref: 'Product',
        },
      },
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
