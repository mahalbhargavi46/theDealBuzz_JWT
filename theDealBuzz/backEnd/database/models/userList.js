const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating a Schema
const userSchema = new Schema({
    name : {
        type : String,
        //atleast three characters long
        minlength : 3,
        //if the name is added with the spaces at the beginning and at the end it will be trimmed out.
        trim : true,
        required : true
    },
    email : { 
        type : String,
        minlength : 3,
        required : true
    },
    password : {
        type : String,
        minlength : 3,
        required : true
    },
    address : {
        type : String,
        minlength : 3,
        required : true
    },
    phoneNumber : {
        type : Number,
        minlength : 10,
        required : true
    },
});
const User = mongoose.model('users',userSchema);
module.exports = User; 