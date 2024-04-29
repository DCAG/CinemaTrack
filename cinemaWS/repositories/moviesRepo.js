const axios = require('axios')

const MOVIES_URL = `${process.env.SUBSCRIPTIONS_SERVER}/movies`

const getAll = async () => {
    const {data} = await axios.get(MOVIES_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${MOVIES_URL}/${id}`)
    return data
}

const update = async (id, object) => {
    const {data} = await axios.put(`${MOVIES_URL}/${id}`,object)
    return data
}

const create = async (object) => {
    const {data} = await axios.post(MOVIES_URL,object)
    return data
}

const remove = async (id) => {
    const {data} = await axios.delete(`${MOVIES_URL}/${id}`)
    return data
}

module.exports = {getById, getAll, update, create, remove}