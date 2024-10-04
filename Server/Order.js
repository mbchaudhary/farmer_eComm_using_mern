const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    image:{
        type: String,
        required: true
    },

    pname:{
        type: String,
        required: true
    },

    productperunit:{
        type: String,
        required: true
    },

    currency:{
        type: String,
        required: true
    },

    unit:{
        type: String,
        required: true
    },

    qty:{
        type: String,
        required: true
    },

    mobileno:{
        type: String,
        required: true
    },

    adminmobileno: {
        type: String,
        required: true
    },

    clientemail:{
        type: String,
        required: true
    },

    adminemail:{
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    },
    totalprice:{
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true
    },

    orderDate:{
        type:String,
        required: true
    },

    bid1:{
        type:String,
        required: true
    },

    bid2:{
        type:String,
        required: true
    },
    

});

module.exports = new mongoose.model('OrderData', orderSchema);