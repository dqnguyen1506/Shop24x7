const mongoose = require('mongoose')
const homepageBannerSchema = mongoose.Schema

const tableModel = new homepageBannerSchema({
    productId: {type: Object},
    name: {type: String},
    category: {type: String},
    price: {type: Number},
    discountPrice: {type: Number},
    description: {type: String}
}, {versionKey: false})

module.exports = mongoose.model('cart', tableModel, 'cart')