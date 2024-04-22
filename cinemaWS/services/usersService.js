const usersCollRepo = require('../repositories/usersCollRepo')
const usersFileRepo = require('../repositories/usersFileRepo')
const permissionsFileRepo = require('../repositories/permissionsFileRepo')

const getAll = async () => {
    const data = await Promise.all([
        usersCollRepo.getAll(),
        permissionsFileRepo.getAll(),
        usersFileRepo.getAll()
    ])
    const credentials = data[0]
    const permissions = data[1]
    const usersData = data[2]
    return credentials.map(creds => {
        const userId = creds._id.toString()
        const userData = usersData.find(item => item.id === userId) 
        const userPermissions = permissions.find(item => item.userId === userId)
        return {
            _id: userId,
            permissions: userPermissions.permissions,
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            createdDate: userData.createdDate,
            sessionTimeout: userData.sessionTimeout,
        }
    })
}

const getByUsername = (username) => {
    return usersCollRepo.getByUsername(username)
}

const verifyCredentials = async (username, password) => {
    if(!username){
        return false
    }
    const credentials = await usersCollRepo.getByUsername(username)
    return credentials.password === password
}

const getById = (id) => {
    return usersCollRepo.getById(id)
}

const update = (id,object) => {
    return usersCollRepo.update(id,object)
}

const create = (object) => {
    return usersCollRepo.create(object)
}

const remove = async (id) => {
    return usersCollRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove, getByUsername, verifyCredentials}