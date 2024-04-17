const moviesRepo = require('../repositories/moviesRepo')

const getAll = () => {
    return moviesRepo.getAll()
}

const getById = (id) => {
    return moviesRepo.getById(id)
}

const update = (id,object) => {
    return moviesRepo.update(id,object)
}

const create = (object) => {
    return moviesRepo.create(object)
}

const remove = async (id) => {
    return moviesRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}