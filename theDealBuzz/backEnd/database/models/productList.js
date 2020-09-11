const mongoose = require('mongoose');

//Creating a Schema
const productSchema = new mongoose.Schema({
    price : {
        type : Number,
        minlength : 1,
        trim : true,
    },
    locality : {
        type : String,
        //atleast three characters long
        minlength : 3,
        //if the name is added with the spaces at the beginning and at the end it will be trimmed out.
        trim : true
    },
    city : {
        type:String,
        minlength:3,
        trim:true
    },
    province : {
        type:String,
        minlength:3,
        trim:true
    },
    postalCode:{
        type:String,
        minlength:3,
        trim:true
    },
    buildingType : {
        type : String,
        minlength: 3,
        trim : true
    },
    description : {
        type : String,
        minlength : 3,
        trim : true
    }
});
const Products = mongoose.model('products',productSchema);
module.exports = Products; 