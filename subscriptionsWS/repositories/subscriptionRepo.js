const subscription = require('../models/subscriptionModel')

const getAll = () => {
    return subscription.find()
}

const getById = (id) => {
    return subscription.findById(id)
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