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


module.exports = {getById, getAll}