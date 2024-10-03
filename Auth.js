const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    mobileno:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    pincode:{
        type: String,
        required: true
    },

    district:{
        type: String,
        required: true
    },

    state:{
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('AuthData', authSchema);