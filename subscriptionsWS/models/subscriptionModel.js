const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
    {
        memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true},
        movies: [
            {
                movie: {type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true},
                date: {type:Date, required:true},
            }
        ]
    },
    {
        versionKey: false 
    }
)

const Subscription = mongoose.model('subscription', subscriptionSchema, 'subscriptions')

module.exports = Subscription
