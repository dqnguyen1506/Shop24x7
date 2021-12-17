const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// const myname = require('./schema/myschema')

const mongoose = require('mongoose')
const cors = require('cors')

//authentication
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = {'secret': 'mysecret'}

const mydb = mongoose.connect(
    'mongodb://localhost:27017/shop24x7', 
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

// USERS API

//register API
//insert user information into the database
app.post('/api/v1/users/register', (req, res) => {
    const fName = req.body.firstName
    const lName = req.body.lastName
    const password = bcrypt.hashSync(req.body.password, 8) //encrypt password
    const email = req.body.email

    //insert user information
    users.insertMany(
        {
            "firstName": fName, 
            "lastName": lName, 
            "password": password, 
            "email": email,
            "role": "user",
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
            //if there's an error inserting, print it
            if (err)
                res.status(500).send(err)
            else
                //if inserted successfully, send back success message/status
                res.status(200).send({"status":"success", "message": "user created successfully."})
        })
})

//login API
//authenticate user, checking if entered email and password exists in the db
app.post('/api/v1/users/login', (req, res) => {
    const password = req.body.password
    const email = req.body.email
    //find if email exists
    users.findOne({"email": email}, (err, result) => {
        if(err) {
            return res.status(500).send(err)
        }
        //email not found, return message
        if(!result){
            return res.status(401).send({"status":"failure", "message": "user does not exists"})
        }
        //if found, compare the password (hashed)
        else{
            const validate = bcrypt.compareSync(password, result.password)
            //password not found, return message
            if(!validate) return res.status(401).send({"status":"failure", "message": "password incorrect"})
            //get token
            var mytoken = jwt.sign({id: result._id}, config.secret, {expiresIn: 3600})
            //if log in successfully, return token and user role (admin/user)
            return res.status(200).send({"status":"success", "message": "user logged in successfully.", "token": mytoken, "role": result.role})
        }
    })
})

// PROFILE API

//getting profile API
//find profile in db
app.post('/api/v1/profile', (req, res) => {
    const email = req.body.email
    //find if email exists
    users.find( {"email": email}, (err, result) => {
        //if theres error with exececuting find()
        if(err) 
            res.status(500).send(err)
        //if success, return profile information
        else
            res.status(200).send({"status":"success", "profile": result})
    })
})

//delete profile image API (setting profileImage to "")
app.delete('/api/v1/profile/image', (req, res) => {
    const email = req.body.email
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"profileImage": ""}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.status(500).send(err)
            else
                res.status(200).send({"status":"success", "message": "profile image deleted successfully"})
        })
})

//update profile image API
//find profile and update it
app.patch('/api/v1/profile/image', (req, res) => {
    const email = req.body.email
    const profileImage = req.body.profileImage
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"profileImage": profileImage}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.status(500).send(err)
            else
                res.status(200).send({"status":"success", "message": "profile image updated successfully"})
        })
})

//update address API
//user information and update their address
app.patch('/api/v1/profile/address', (req, res) => {
    const email = req.body.email
    const address = req.body.address
    users.findOneAndUpdate(
        {"email": email},
        {$set: {"address": address}},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.status(500).send(err)
            else
                res.status(200).send({"status":"success", "message": "profile modified successfully"})
        })
})




// Homepage APIs

// GET /api/v1/homepage/banner
const homepageBanner = require('./schema/homepageBannerSchema')

app.get('/api/v1/homepage/banner', (req, res) => {
    homepageBanner.find({ published: true }, 
        null, { limit: 3 },(err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json({"status":"success","products": result})
    })
})


// GET /api/v1/homepage/categories
const homepageCategories = require('./schema/homepageCategoriesSchema')

app.get('/api/v1/homepage/categories', (req, res) => {
    homepageCategories.find({ published: true }, 
        null, { limit: 3 },(err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json({"status":"success","categories": result})
    })
})


// GET /api/v1/homepage/products
const homepageProducts = require('./schema/homepageProductsSchema')

app.get('/api/v1/homepage/products', (req, res) => {
    homepageProducts.find({ published: true }, 
        null, { limit: 8 },(err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json({"status":"success","products": result})
    })
})


// GET /api/v1/products
const products = require('./schema/productsSchema')

app.get('/api/v1/products', (req, res) => {
    products.find((err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json({"status":"success","products": result})
    })
})


// GET /api/v1/products/:PRODUCT_ID
app.get('/api/v1/products/:PRODUCT_ID', (req, res) => {
    var ObjectId = require('mongodb').ObjectId; 
    const productID = req.params['PRODUCT_ID']
    console.log(productID)
    products.find({ "_id": ObjectId(productID) }, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).json({"status":"success","product": result[0]})
    })
})


// Admin APIs
// POST /api/v1/admin/products
// Allows admin users to add new products.
app.post('/api/v1/admin/products', (req, res) => {
    req.body.created_on = new Date()
    products.insertMany(req.body, (err, result) => {
        if(err) 
            res.status(500).send(err)
        else
            res.status(200).send({"status":"success", "message": "product added successfully"})
    })
})


// DELETE /api/v1/admin/products/:id
// Allows admin users to delete products based on product id.
app.delete('/api/v1/admin/products/:id', (req, res) => {
    var ObjectId = require('mongodb').ObjectId; 
    const productID = req.params['id']
    products.findOneAndDelete({ "_id": ObjectId(productID) },
            (err, result) => {
                if (err)
                    res.status(500).send(err)
                else
                res.status(200).send({"status":"success", "message": "product deleted successfully"})
            })
})

// PATCH /api/v1/admin/products/:id
// ---------------pending--------------------------



// Category Listing
// GET /api/v1/categories/:CATEGORY_ID

app.get('/api/v1/categories/:CATEGORY_ID', (req, res) => {
    var ObjectId = require('mongodb').ObjectId; 
    const CATEGORY_ID = req.params['CATEGORY_ID']
    console.log(CATEGORY_ID)
    
    homepageCategories.find({ "_id": ObjectId(CATEGORY_ID) }, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            var category_name = result[0].name.toLowerCase()
            products.find({ "category": category_name }, (err, result) => {
                if (err)
                    res.status(500).send(err)
                else
                    console.log(result)
                    res.status(200).json({"status":"success","category": category_name,"products": result})
            })
    })
})

//cart (temporary solution)
const cart = require('./schema/cartSchema')

//POST /api/v1/cart
app.post('/api/v1/cart', (req, res) => {
    
    const productId = req.body.productId
    cart.findOneAndUpdate(
        {"productId": productId},
        {$inc: {"quantity": 1}},
        {upsert: false}, 
        (err, result) => {
            if(err) 
                res.status(500).send(err)
            else
                //if product doesnt exist in cart
                if(!result){
                    cart.insertMany(req.body, (err, result) => {
                        if(err) 
                            res.status(500).send(err)
                        else
                            res.status(200).send({"status":"success", "message": "product added to cart successfully"})
                    })
                }
                else{
                    res.status(200).send({"status":"success", "message": "product found!"})
                }
    })
})

//DELETE 
app.delete("/api/v1/cart", (req, res) => {
    const productId = req.body.productId
    cart.findOneAndDelete(productId, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).send({"status":"success", "message": "cart item deleted successfully"})
    })
})

//GET /api/v1/cart
app.get('/api/v1/cart', (req, res) => {

    cart.find((err, result) => {
            if (err)
                res.status(500).send(err)
            else
            res.status(200).send({"status":"success", "cart": result})
        })
})


//Delete product
app.delete('/api/v1/cart/:productId', (req, res) => {
    const productId = req.params['productId']
    cart.findOneAndDelete(productId, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(200).send({"status":"success", "message": "cart item deleted successfully"})
    })
})

// Update/Edit Product
app.patch('/api/v1/admin/products/:id', (req, res) => {
    const productID = req.params['id']
    
    const name = req.body.name
    const category = req.body.category
    const price = req.body.price
    const discountPrice = req.body.discountPrice
    const image = req.body.image
    const description = req.body.description
    const isTopProduct = req.body.isTopProduct
    const created_on = new Date()
    products.findOneAndUpdate(
        {"_id": productID},
        {$set: {"name": name, "name": name, "category": category, "price": price, "discountPrice": discountPrice, "image": image, "description": description, "isTopProduct": isTopProduct, "created_on": created_on }},
        {upsert: true}, 
        (err, result) => {
            if(err) 
                res.status(500).send(err)
            else
                res.status(200).send({"status":"success", "message": "product updated successfully"})
        })
})