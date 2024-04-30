const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        genres: [{type:String, required:true}],
        image: {type:String, required:true},
        premiered: {type:Date, required:true},
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

movieSchema.virtual('subscriptions', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'movies.movie', // field in other model pointing to this model
  //justOne : true
});
  
movieSchema.pre('find', function(next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'subscriptions',
    options: { _recursed: true },
    transform: (doc, id) => {
      if(doc==null){
        return doc
      }

      return {
        _id: doc._id,
        // find() will always have something otherwise the field would not populate
        date: (doc.movies.find(m=>m.movie.equals(id))).date,
        member: doc.member
      }
    },
    populate: {
      path: 'member',
      options: { _recursed: true },
      transform: (doc,id) => ({name: doc.name, _id: doc._id})
    },
  })
  next();
});

const Movie = mongoose.model('movie', movieSchema, 'movies')

module.exports = Movie
