const mongoose = require('mongoose')
const homepageProductsSchema = mongoose.Schema

const tableModel = new homepageProductsSchema({
    name: {type: String},
    category: {type: String},
    price: {type: Number},
    discountPrice: {type: Number},
    description: {type: String},
    image: {type: String},
    created_on: {type: Date, default: Date.now},
    isTopProduct: {type: Boolean}
}, {versionKey: false})

module.exports = mongoose.model('homepageProducts', tableModel, 'products')
