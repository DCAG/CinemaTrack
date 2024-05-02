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
// const remove = async (id) => {
//     const movie = await movieRepo.getById(id)
//     const subscriptions = movie.subscriptions.map(sub => sub._id)
//     const data = await movieRepo.remove(id)
//     const result = {
//         movie: data,
//          // NOTE: update affected subscriptions in client side
//         subscriptions
//     }
//     return result
    return movieRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}