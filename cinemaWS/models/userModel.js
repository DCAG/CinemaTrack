const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {type:String, required:true},
        password: {type:String},
    },
    {
        versionKey: false
    }
)

const User = mongoose.model('user', userSchema, 'users')

module.exports = User
