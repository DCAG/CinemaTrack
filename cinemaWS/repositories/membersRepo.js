const axios = require('axios')

const MEMBERS_URL = `${process.env.SUBSCRIPTIONS_SERVER}/members`

const getAll = async () => {
    const {data} = await axios.get(MEMBERS_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${MEMBERS_URL}/${id}`)
    return data
}

const create = async (object) => {
    const {data} = await axios.post(MEMBERS_URL, object)
    return data
}

const update = async (id,object) => {
    const {data} = await axios.put(`${MEMBERS_URL}/${id}`, object)
    return data
}

const remove = async (id) => {
    const {data} = await axios.delete(`${MEMBERS_URL}/${id}`)
    return data
}


module.exports = {getById, getAll, create, update, remove}