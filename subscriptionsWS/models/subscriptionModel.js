const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
    {
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true},
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

subscriptionSchema.pre('find', function(next) {
  if (this.options._recursed) {
    return next();
  }
  this
  .populate({ path: 'member', options: { _recursed: true } })
  .populate({ path: 'movies.movie', options: { _recursed: true } });
  next();
});

const Subscription = mongoose.model('subscription', subscriptionSchema, 'subscriptions')

module.exports = Subscription
