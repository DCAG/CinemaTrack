const mongoose = require('mongoose')

const REPLACE_MESchema = new mongoose.Schema(
    {
        temp1: {type:String, required:true},
        temp2: {type: mongoose.Schema.Types.ObjectId, ref: 'temp3'}
    },
    {
        versionKey: false
    }
)

const REPLACE_ME = mongoose.model('REPLACE_ME', REPLACE_MESchema, 'REPLACE_MEs')

module.exports = REPLACE_ME
