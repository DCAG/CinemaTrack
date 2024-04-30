const jsonfile = require('jsonfile')

const USERS_FILE = './auth/users.json'

const getAll = async () => {
    const data = await jsonfile.readFile(USERS_FILE)
    return data
}

const getById = async (id) => {
    const data = await jsonfile.readFile(USERS_FILE)
    return data.find(item => item.id === id)
}

const getByUsername = async (username) => {
    const data = await jsonfile.readFile(USERS_FILE)
    return data.find(item => item.username === username)
}

const create = async (object) => {
    if(!(object.id && object.createdDate && object.firstName && object.lastName && object.username && object.sessionTimeout)){
        throw {
            message: "one of the fields is missing: id, createdDate, firstName, lastName, username, sessionTimeout",
            target: object
        }
    }
    try{
        const data = await jsonfile.readFile(USERS_FILE)
        // TODO: check if "username" and "id" are unique, if not throw an error
        jsonfile.writeFile(USERS_FILE,[...data, object])
        return object
    }
    catch(error){
        throw {
            message: 'failed to create user',
            target: object,
            innerError: error
        }
    }
}

const update = async (id, object) => {
    try{
        const data = await jsonfile.readFile(USERS_FILE)
        const index = data.findIndex(item => item.id === id)
        // thinking: there is an option this way to update the id inside the object... might want to prevent that (or not)
        data[index] = {...data[index],...object}
        // TODO: check if "username" and "id" are unique, if not throw an error
        jsonfile.writeFile(USERS_FILE,data)
        return data[index]
    }
    catch(error){
        throw {
            message: 'failed to update user',
            target: [id, object],
            innerError: error
        }
    }
}

const remove = async (id) => {
    try{
        const data = await jsonfile.readFile(USERS_FILE)
        const newData = data.filter(item => item.id === id)
        jsonfile.writeFile(USERS_FILE,newData)
        return `${id} was deleted`
    }
    catch(error){
        throw {
            message: 'failed to remove user',
            target: id,
            innerError: error
        }
    }
}

module.exports = {getAll, getById, getByUsername, create, update, remove}