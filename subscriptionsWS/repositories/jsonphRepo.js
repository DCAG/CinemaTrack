const axios = require('axios')

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

const getAll = async () => {
    const {data} = await axios.get(USERS_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${USERS_URL}/${id}`)
    return data
}


module.exports = {getById, getAll}