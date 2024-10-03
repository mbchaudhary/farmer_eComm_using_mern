const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
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

    adminemail:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('ProductData', ProductSchema);