const createError = require('http-errors');
const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser'); 
const cors=require('cors'); 
const passport = require('passport');
//express-session to provide persistent functionality that will create a cookie 
const session = require('express-session');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//importing the authentication file
const checkAuth = require("./middleware/check-auth");

//Connecting to database
const mongoose = require('./database/db');
//importing schemas
const Products = require('./database/models/productList');
const User = require('./database/models/userList');
const { use } = require('passport');
// const { use } = require('passport');

/* CORS - Cross Origin Request Security.*/
app.use(cors({
    //cross origin. Some brwosers do not add cookies 
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

//Same as body-parser library
app.use(express.json());


//creating a session
app.use(session({
    name:'cookie.sid',
    resave:false, //not saving the object for every request
    saveUninitialized:false, //not saving a session until a successful login is done
    secret:'secret', //encrypting cookie
    cookie:{
        maxAge:36000000, //age of the cookie is one day
        httpOnly:false,
        secure:false 
    }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());



/* RestFul API for Products :  Creating, Updating, ReadOne, ReadAll, Deleting */

//to get the values from the database 
app.get('/products', (req,res) => {
    Products.find({})
    .then(products => res.send(products))
    .catch((error) => console.log(error))
}); 

//to post the values to the database 
app.post('/products',(req,res)=>{
    (new Products({
        'price' : req.body.price,
        'locality' : req.body.locality,
        'city' : req.body.city,
        'province' : req.body.province,
        'postalCode' : req.body.postalCode,
        'buildingType' : req.body.buildingType,
        'description' : req.body.description
    }))
    .save()
    .then((product) => res.send(product))
    .catch((error) => console.log(error));
});

//to get one value from database
app.get('/products/:_id', (req,res) => {
    Products.findById({_id: req.params._id})
    .then((product) => res.send(product)) 
    .catch((error) => console.log(error));
});


app.patch('/products/:_id', (req , res) => {
    Products.findByIdAndUpdate({'_id' : req.params._id},{
        $set : {
          'price' : req.body.price,
          'locality' : req.body.locality,
          'city' : req.body.city,
          'province' : req.body.province,
          'postalCode' : req.body.postalCode,
          'buildingType' : req.body.buildingType,
          'description' : req.body.description
        }
    }, {new : true}, function(err,product){
        if(err){
            console.log(err);
        }
        else{
            res.send(product);
        }
    });
}); 

//deleting the data
app.delete('/products/:_id',(req,res) =>{
    Products.findByIdAndDelete({'_id' : req.params._id})
    .then((product) => res.send({message:'Deleted Successfully'}))
    .catch((error) => console.log(error));
});
/* RestFul API for Users :  Creating, Updating, ReadOne, ReadAll, Deleting */
//GET functionality for users
app.get('/users',(req,res)=>{
    User.find({})
    .then((users)=> res.send(users))
    .catch((error)=>console.log(error));
});

//READONE functionality for users 
app.get('/users/:userID', (req,res)=>{
    User.findOne({_id:req.params.userID})
    .then((user) => res.send(user))
    .catch((error)=>console.log(error));
});
//UPDATE functionality for users
app.patch('/users/:userID', (req,res)=>{
    User.findByIdAndUpdate({ _id: req.params.userID }, {
        $set : {
            'name' : req.body.name,
            'email' : req.body.email,
            'password' : req.body.password,
            'address' : req.body.address,
            'phoneNumber' : req.body.phoneNumber
        }
    },{new : true}, function(err,user){
        if(err){
            console.log(err);
        }
        else{
            res.send({message:'Successfully Updated'});
        }
    });
});
//DELETE functionality for users 
//to be worked on (Broken Code)
app.delete('/users/:userID', (req,res) => {
    const deleteProducts = (product) => {
        Products.deleteMany({_userID: user._id})
        .then(() => user)
        .catch((error) => console.log(error));
    }
    const user = User.findByIdAndDelete(req.params.userID)
                    .then((user)=>deleteProducts(user))
                    .catch((error)=>console.log(error));
    res.send(user);
});


//to create a new user (POST functionality for users)
app.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hash,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message:'Admin account created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
    });
});
// login route
app.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message:"User does not exist!"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password); 
        })
        .then(result => {
            if(!result){
                return res.status(401).json({
                    message:"Login Failed!!"
                });
            }
            //JSON WEB TOKEN
            const token = jwt.sign(
                {email:fetchedUser.email, userId:fetchedUser._id}, 
                'secret_this_should_be_longer',
                {expiresIn:'1h'}
            );
            console.log(token);
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message:"Authentication Failed!!"
            });
        })
});

// app.get('/admin', checkAuth, function(req, res, next){
//     return res.status(200).json(req.user);
// })
 
app.get('/logout', function(req,res, next){
  req.logOut();
  return res.status(200).json({message:'Logout Success'});
})

module.exports = Products;
module.exports = User;
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));