const mongoose = require('mongoose');

const DBConnection = async()=>{
    try{
        // mongoose.connect('mongodb://localhost:27017/Farmer-Ecommrce');
       await mongoose.connect('mongodb+srv://coder:abc@cluster0.rbhtlmm.mongodb.net/farmer-ecomm?retryWrites=true&w=majority');
        console.log("Connect Database");
    }catch(error){
        console.log(error);
    };
}

module.exports = DBConnection;