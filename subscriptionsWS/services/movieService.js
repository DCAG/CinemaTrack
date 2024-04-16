const movieService = require('../repositories/movieRepo')

const getAll = () => {
    return movieService.getAll()
}

const getById = (id) => {
    return movieService.getById(id)
}

const update = (id,object) => {
    return movieService.update(id,object)
}

const create = (object) => {
    return movieService.create(object)
}

const remove = async (id) => {
    return movieService.remove(id)
}

module.exports = {getAll, getById, create, update, remove}