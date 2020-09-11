const mongoose = require('mongoose');

//allows us to use promises to handle asynchronous code
mongoose.Promise = global.Promise;

//Connecting to the database 
const dbURI="mongodb+srv://capstone:PROG8380@cluster1.md8dg.mongodb.net/BuyandSell?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>console.log(`Mongoose Connected to ${dbURI}`))
    .catch(err=>console.log('Connection Failed', err));

module.exports=mongoose;
//mongodb+srv://anjali18:anjali18@buysell-pvvd9.mongodb.net/test