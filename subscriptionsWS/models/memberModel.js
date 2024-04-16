const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true},
        city: {type:String, required:true},
    },
    {
        versionKey: false
    }
)

const Member = mongoose.model('member', memberSchema, 'members')

module.exports = Member
