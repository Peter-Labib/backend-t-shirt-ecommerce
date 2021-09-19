const mongoose = require('mongoose')

const { Schema } = require('mongoose')

const inventorySchema = new Schema({
  product: { type: mongoose.Types.ObjectId, require: true, ref: 'Product'},
  oneSizeCount: { type: Number },
  countAlphabeticSizesInStock: {
    XS: { type: Number },
    S: { type: Number },
    M: { type: Number },
    Lg: { type: Number },
    XL: { type: Number },
    XXL: { type: Number },
  },
  countBottomSizesInStock: {
    28: { type: Number },
    29: { type: Number },
    30: { type: Number },
    31: { type: Number },
    32: { type: Number },
    33: { type: Number },
    34: { type: Number },
    36: { type: Number },
    38: { type: Number },
    40: { type: Number },
  },
  countShoesSizesInStock: {
    39: { type: Number },
    40: { type: Number },
    41: { type: Number },
    42: { type: Number },
    43: { type: Number },
    44: { type: Number },
    45: { type: Number },
    46: { type: Number },
    47: { type: Number },
  },
})

module.exports = mongoose.model('Inventory', inventorySchema)
