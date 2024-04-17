const membersRepo = require('../repositories/membersRepo')

const getAll = () => {
    return membersRepo.getAll()
}

const getById = (id) => {
    return membersRepo.getById(id)
}

const update = (id,object) => {
    return membersRepo.update(id,object)
}

const create = (object) => {
    return membersRepo.create(object)
}

const remove = async (id) => {
    return membersRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}