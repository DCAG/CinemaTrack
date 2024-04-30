const axios = require('axios')

const SUBSCRIPTIONS_URL = `${process.env.SUBSCRIPTIONS_SERVER}/subscriptions`

const getAll = async () => {
    const {data} = await axios.get(SUBSCRIPTIONS_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${SUBSCRIPTIONS_URL}/${id}`)
    return data
}

const getByMemberId = async (id) => {
    const {data} = await axios.get(`${SUBSCRIPTIONS_URL}/memberId/${id}`)
    return data
}

const create = async (payload) => {
    const {data} = await axios.post(SUBSCRIPTIONS_URL, payload)
    return data
}

const update = async (id, payload) => {
    const {data} = await axios.put(`${SUBSCRIPTIONS_URL}/${id}`, payload)
    return data
}

const remove = async (id) => {
    const {data} = await axios.delete(`${SUBSCRIPTIONS_URL}/${id}`)
    return data
}

module.exports = {getById, getAll, create, remove, getByMemberId, update}