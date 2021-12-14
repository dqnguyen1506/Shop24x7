const mongoose = require('mongoose')
const mySchema = mongoose.Schema

const tableModel = new mySchema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    profileImage: {type: String},
    address: {type: Object}
}, {versionKey: false})

module.exports = mongoose.model('users', tableModel, 'users')