const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// const myname = require('./schema/myschema')

const users = require('./schema/myschema')

const mongoose = require('mongoose')

const mydb = mongoose.connect(
    'mongodb://localhost:27017/tcs15', 
    {useUnifiedTopology: true, useNewUrlParser: true}
)

// app.get('/', (req, res) => {
//     res.send('Mongoose Use is Successful')
// })

app.listen(8080)

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