const user = require('../models/userModel')

const getAll = () => {
    return user.find()
}

const getById = (id) => {
    return user.findById(id)
}

const getByUsername = (username) => {
    return user.findOne({username: username})
}

const update = (id,object) => {
    return user.findByIdAndUpdate(id,object)
}

const create = (object) => {
    return user.create(object)
}

const remove = (id) => {
    return user.findByIdAndDelete(id)
}


module.exports = {getAll, getById, update, create, remove, getByUsername}