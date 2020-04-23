const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "It's required"]
    },
    email: {
        type: String,
        required: [true, 'email is required- from mongoose'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gravatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema);

module.exports = User;