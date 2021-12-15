const mongoose = require('mongoose')
const mySchema = mongoose.Schema

const userModel = new mySchema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    profileImage: {type: String},
    address: {
        streetAddress: {type: String},
        city: {type: String},
        state: {type: String},
        zipcode: {type: String}
    },
    interests: {type: Array},
    phoneNumber: {type: String}
}, {versionKey: false})

module.exports = mongoose.model('users', userModel, 'users')