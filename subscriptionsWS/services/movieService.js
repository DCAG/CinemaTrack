const movieRepo = require('../repositories/movieRepo')

const getAll = () => {
    return movieRepo.getAll()
}

const getById = (id) => {
    return movieRepo.getById(id)
}

const update = (id,object) => {
    return movieRepo.update(id,object)
}

const create = (object) => {
    return movieRepo.create(object)
}

const remove = (id) => {
    return movieRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}