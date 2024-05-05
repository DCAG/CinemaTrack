const member = require('../models/memberModel')

const getAll = () => {
    return member.find()
}

const getById = (id) => {
    return member.findById(id)
}

const update = (id,object) => {
    return member.findByIdAndUpdate(id,object,{new:true})
}

const createMany = (objects) => {
    return member.insertMany(objects)
}

const create = (object) => {
    return member.create(object)
}

const remove = (id) => {
    return member.findByIdAndDelete(id)
}

const removeAll = () => {
    return member.collection.drop()
}


module.exports = {getAll, getById, update, createMany, create, remove, removeAll}