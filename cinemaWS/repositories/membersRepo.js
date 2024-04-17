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


module.exports = {getById, getAll}