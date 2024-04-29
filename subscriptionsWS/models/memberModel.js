const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true},
        city: {type:String, required:true},
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

memberSchema.virtual('subscriptions', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'member', // field in other model pointing to this model
  justOne : true
});

memberSchema.pre('find', function(next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'subscriptions',
    options: { _recursed: true },
    populate: {
      path: 'movies.movie',
      options: { _recursed: true },
      transform: (doc,id) => ({name: doc.name, _id: doc._id})
    },
  })
  next();
});

const Member = mongoose.model('member', memberSchema, 'members')

module.exports = Member
