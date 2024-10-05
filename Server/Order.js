const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    qty:{
        type: String,
        required: true
    },

    mobileno:{
        type: String,
        required: true
    },

    clientemail:{
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
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductData'  // Referencing the ProductData model to link the order with the product
    }
});

module.exports = new mongoose.model('OrderData', orderSchema);