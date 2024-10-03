const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/Farmer-Ecommrce');
    console.log("Connect Database");
}catch(error){
    console.log(error);
};