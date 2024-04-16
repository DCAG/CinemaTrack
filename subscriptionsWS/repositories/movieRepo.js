const movie = require('../models/movieModel')

const getAll = () => {
    return movie.find()
}

const getById = (id) => {
    return movie.findById(id)
}

const update = (id,object) => {
    return movie.findByIdAndUpdate(id,object)
}

const createMany = (objects) => {
    return movie.insertMany(objects)
}

const create = (object) => {
    return movie.create(object)
}

const remove = (id) => {
    return movie.findByIdAndDelete(id)
}

const removeAll = () => {
    return movie.collection.drop()
}

module.exports = {getAll, getById, update, createMany, create, remove, removeAll}