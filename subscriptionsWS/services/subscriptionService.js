const subscriptionService = require('../repositories/subscriptionRepo')

const getAll = () => {
    return subscriptionService.getAll()
}

const getById = (id) => {
    return subscriptionService.getById(id)
}

const getByMemberId = (id) => {
    return subscriptionService.getByMemberId(id)
}

const update = (id,object) => {
    return subscriptionService.update(id,object)
}

const create = (object) => {
    return subscriptionService.create(object)
}

const remove = async (id) => {
    return subscriptionService.remove(id)
}

module.exports = {getAll, getById, create, update, remove, getByMemberId}