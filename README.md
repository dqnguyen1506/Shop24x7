# Shop24x7

Shop24x7 is a e-commerce web application run on MEAN Stack (MongoDb, Express.js, Angular.js, and Node).

## Features

* Authentication System
  * Encrypted passwords
  * JWS Token to ensure authentication (Public | Logged in | Admin) 
* APIs
  * Various APIs to retrieve, edit, and display data from the database
* Search Bar
  * Searching for any items in the database
* Items Sort
  * Sort by categories
  * Sort by prices
* User Profile (Admin | Logged In)
  * Edit, delete 
* Manage Products (Admin)
  * Admin account(s) can add, edit products 
* Cart
  * adding items into cart for checkout 
   
Deployed website: [In Progress]

## Developer Guide

### Technologies and Software Used:

* Stack: MongoDb, Express.js, Angular.js, Node
* Third-party component: Bootstrap, JWT, Bcrypt.js, Mongoose
* Additional Tools: Mongodb Connect, Postman

### Required Downloads

MongoDb, Express.js, Angular.js, Node.js, Npm

### Setup 

## Backend
1. First clone the given repo and locate repo in local folder directory
2. `cd /Shop24x7/Backend`
3. `npm install` to install all dependencies used in project
4. (MongoDb) Change connection string in `index.js` file to the appropriate database on your end
5. (MongoDb) pre-populate the database using commands in `/Shop24x7/Pre-Populate/mongoDbCommands.json` 
6. `nodemon index.js` to start up the server (@port 8080) to start handling API calls
7. (optional) to test admin account's features, change "role" variable in `users` collection to "admin"

## Frontend
2. `cd /Shop24x7/Frontend`
3. `npm install` to install all dependencies used in project
5. `ng serve` to start Angular project

## Previews:
![login page (v3)](https://user-images.githubusercontent.com/44854519/125171256-1039bd80-e168-11eb-895a-f933bd4a3095.png)
![homepage v4](https://user-images.githubusercontent.com/44854519/128401837-cb72e235-de39-43de-acf3-8bce4694f084.png)
![giphy](https://user-images.githubusercontent.com/44854519/125171100-3579fc00-e167-11eb-83f3-cb42ab29d202.gif)
![homepage animation](https://user-images.githubusercontent.com/44854519/125171106-40349100-e167-11eb-9552-85ed6aff4366.gif)
![upload animation](https://user-images.githubusercontent.com/44854519/125171111-4a568f80-e167-11eb-99db-e0a743ae7d29.gif)

## Versions:
    1.0.0: Features listed added and implemented
    
## Future Features to Be Added
1. Checkout (API/UI)
2. Order (API/UI) => logged-in users can track their orders/admin users can access all orders made by users
3. Storing profile pictures
    
