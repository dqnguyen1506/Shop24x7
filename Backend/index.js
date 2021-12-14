const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// const myname = require('./schema/myschema')

const mongoose = require('mongoose')
const cors = require('cors')

const mydb = mongoose.connect(
    'mongodb://localhost:27017/tcs15', 
    {useUnifiedTopology: true, useNewUrlParser: true}
)

//Prevent cors issue when calling API from frontend
app.use(
    cors({
        origin: 'http://localhost:4200'
    })
)

app.listen(8080)

const users = require('./schema/userSchema')

//register API
app.post('/v1/users/register', (req, res) => {
    const fName = req.body.firstName
    const lName = req.body.lastName
    const password = req.body.password
    const email = req.body.email
    // const profileImage = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"

    users.insertMany(
        {
            "firstName": fName, 
            "lastName": lName, 
            "password": password, 
            "email": email,
            "profileImage": "", 
            "interests": "",
            "phoneNumber": "",
            "address": 
            {
                "streetAddress": "", 
                "city": "",
                "state": "",
                "zipcode": ""
            }
        }, (err, result) => {
            if (err)
                res.send(err)
            else
                res.send({"status":"success", "message": "user created successfully."})
                // res.json(result)
        })
})

//login API
app.post('/v1/users/login', (req, res) => {
    const password = req.body.password
    const email = req.body.email
    users.find( {"email": email, "password": password}, (err, result) => {
        if(err) 
            res.send(err)
        else
            if(result.length > 0)
                res.send({"status":"success", "message": "user logged in successfully."})
            else
                res.send({"status":"failure", "message": "user does not exists"})
    })
})

//getting profile API
app.post('/v1/profile', (req, res) => {
    const email = req.body.email
    users.find( {"email": email}, (err, result) => {
        if(err) 
            res.send(err)
        else
            res.send({"status":"success", "profile": result})
    })
})

//delete profile image API (setting profileImage to "")
app.delete('/v1/profile/image', (req, res) => {
    const email = req.body.email
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"profileImage": ""}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.send(err)
            else
                res.send({"status":"success", "message": "profile image deleted successfully"})
        })
})

//update profile image API
app.patch('/v1/profile/image', (req, res) => {
    const email = req.body.email
    const profileImage = req.body.profileImage
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"profileImage": profileImage}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.send(err)
            else
                res.send({"status":"success", "message": "profile image updated successfully"})
        })
})

//update address API
app.patch('/v1/profile/address', (req, res) => {
    const email = req.body.email
    const address = req.body.address
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"address": address}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.send(err)
            else
                res.send({"status":"success", "message": "profile modified successfully"})
        })
})




// Homepage APIs

// GET /api/v1/homepage/banner
const homepageBanner = require('./schema/homepageBannerSchema')

app.get('/api/v1/homepage/banner', (req, res) => {
    homepageBanner.find({ published: true }, 
        null, { limit: 3 },(err, result) => {
        if (err)
            res.send(err)
        else
            res.json({"status":"success","products": result})
    })
})


// GET /api/v1/homepage/categories
const homepageCategories = require('./schema/homepageCategoriesSchema')

app.get('/api/v1/homepage/categories', (req, res) => {
    homepageCategories.find({ published: true }, 
        null, { limit: 3 },(err, result) => {
        if (err)
            res.send(err)
        else
            res.json({"status":"success","categories": result})
    })
})


// GET /api/v1/homepage/products
const homepageProducts = require('./schema/homepageProductsSchema')

app.get('/api/v1/homepage/products', (req, res) => {
    homepageProducts.find({ published: true }, 
        null, { limit: 8 },(err, result) => {
        if (err)
            res.send(err)
        else
            res.json({"status":"success","products": result})
    })
})


// GET /api/v1/products
const products = require('./schema/productsSchema')

app.get('/api/v1/products', (req, res) => {
    products.find((err, result) => {
        if (err)
            res.send(err)
        else
            res.json({"status":"success","products": result})
    })
})