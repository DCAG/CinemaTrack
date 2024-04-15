const axios = require('axios')

REPLACE_ME_URL = "https://SOME_REPLACE_ME_URL/"

const getAll = async () => {
    const {data} = await axios.get(REPLACE_ME_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${REPLACE_ME_URL}/${id}`)
    return data
}


module.exports = {getById, getAll}