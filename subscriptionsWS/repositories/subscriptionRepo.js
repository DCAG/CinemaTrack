const subscription = require('../models/subscriptionModel')
const member = require('../models/memberModel')
const movie = require('../models/movieModel')

const getAll = () => {
    return subscription.find().populate('memberId').populate('movies.movie').exec()
}

const getById = (id) => {
    return subscription.findById(id).populate('memberId').populate('movies.movie').exec()
}

const update = (id,object) => {
    return subscription.findByIdAndUpdate(id,object)
}

const create = (object) => {
    return subscription.create(object)
}

const remove = (id) => {
    return subscription.findByIdAndDelete(id)
}


module.exports = {getAll, getById, update, create, remove}