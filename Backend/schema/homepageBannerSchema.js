const mongoose = require('mongoose')
const homepageBannerSchema = mongoose.Schema

const tableModel = new homepageBannerSchema({
    products: {type: Object}
}, {versionKey: false})

module.exports = mongoose.model('homepageBanner', tableModel, 'homepageBanner')