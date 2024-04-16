const axios = require('axios')

const MOVIES_URL = "https://api.tvmaze.com/shows"

const getAll = async () => {
    const {data} = await axios.get(MOVIES_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${MOVIES_URL}/${id}`)
    return data
}


module.exports = {getById, getAll}