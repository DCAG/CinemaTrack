const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
    {
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true, unique: true},
        movies: [
            {
            movie: {type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true, /*unique: true*/}, //should be unique but it doesn't work here - need to change to an object/map/hashtable or check outside
                date: {type:Date, required:true},
            }
        ]
    },
    {
        versionKey: false 
    }
)

subscriptionSchema.pre(/^find/, function(next) {
  if (this.options._recursed) {
    return next();
  }
  this
  .populate({ path: 'member', options: { _recursed: true } })
  .populate({ path: 'movies.movie', options: { _recursed: true } });
  next();
});

subscriptionSchema.post('save', (doc, next) => {
  doc.populate({ path: 'member'
  }).then((doc)=>doc
    .populate({ path: 'movies.movie'
  })).then(()=>{
    next();
  });
});

const Subscription = mongoose.model('subscription', subscriptionSchema, 'subscriptions')

module.exports = Subscription
