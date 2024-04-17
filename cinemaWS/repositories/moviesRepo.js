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


module.exports = {getById, getAll}