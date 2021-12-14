const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// const myname = require('./schema/myschema')

const users = require('./schema/myschema')

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

//register API
app.post('/v1/users/register', (req, res) => {
    const fName = req.body.firstName
    const lName = req.body.lastName
    const password = req.body.password
    const email = req.body.email
    const profileImage = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"

    users.insertMany(
        {
            "firstName": fName, 
            "lastName": lName, 
            "password": password, 
            "email": email,
            "profileImage": profileImage, 
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
//TODO: change to post once learned JWT
app.get('/v1/users/login', (req, res) => {
    const password = req.query.password
    const email = req.query.email
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