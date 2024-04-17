const subscriptionsRepo = require('../repositories/subscriptionsRepo')

const getAll = () => {
    return subscriptionsRepo.getAll()
}

const getById = (id) => {
    return subscriptionsRepo.getById(id)
}

const update = (id,object) => {
    return subscriptionsRepo.update(id,object)
}

const create = (object) => {
    return subscriptionsRepo.create(object)
}

const remove = async (id) => {
    return subscriptionsRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}