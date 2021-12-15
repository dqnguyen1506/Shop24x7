const mongoose = require('mongoose')
const homepageCategoriesSchema = mongoose.Schema

const tableModel = new homepageCategoriesSchema({
    name: {type: String}
}, {versionKey: false})

module.exports = mongoose.model('homepageCategories', tableModel, 'homepageCategories')