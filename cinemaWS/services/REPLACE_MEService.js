const REPLACE_ME_DB_Repo = require('../repositories/REPLACE_ME_DB_Repo')

const getAll = () => {
    return REPLACE_ME_DB_Repo.getAll()
}

const getById = (id) => {
    return REPLACE_ME_DB_Repo.getById(id)
}

const update = (id,object) => {
    return REPLACE_ME_DB_Repo.update(id,object)
}

const create = (object) => {
    return REPLACE_ME_DB_Repo.create(object)
}

const remove = async (id) => {
    return REPLACE_ME_DB_Repo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}