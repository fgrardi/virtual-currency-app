const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: { 
        type: String, 
        unique: true 
    },
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: { 
        type: String, 
        unique: true 
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);