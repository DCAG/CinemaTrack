const memberRepo = require('../repositories/memberRepo')

const getAll = () => {
    return memberRepo.getAll()
}

const getById = (id) => {
    return memberRepo.getById(id)
}

const update = (id,object) => {
    return memberRepo.update(id,object)
}

const create = (object) => {
    return memberRepo.create(object)
}

const remove = async (id) => {
    return memberRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}