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

const getById = async (id) => {
    const data = await Promise.all([
        usersCollRepo.getById(id),
        permissionsFileRepo.getById(id),
        usersFileRepo.getById(id)
    ])
    const creds = data[0]
    const userPermissions = data[1]
    const userData = data[2]
    
    const userId = creds._id.toString()

    return {
        _id: userId,
        permissions: userPermissions.permissions,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        createdDate: userData.createdDate,
        sessionTimeout: userData.sessionTimeout,
    }
}

const update = (id,object) => {
    return usersCollRepo.update(id,object)
}

const create = async (object) => {
    console.log(object)
    const data = await usersCollRepo.create(object)
    const permissionsFileObj = {
        userId: data._id,
        permissions: object.permissions
    }
    const usersFileObj = {
        id: data._id,
        firstName: object.firstName,
        lastName: object.lastName,
        createdDate: (new Date()).toISOString().replace(/T.*Z$/,''),
        username: object.username,
        sessionTimeout: +object.sessionTimeout,
    }
    const result = await Promise.all([
        permissionsFileRepo.create(permissionsFileObj),
        usersFileRepo.create(usersFileObj)
    ])
    console.log(result)
    const createdUser = await getById(data._id)
    return createdUser
}

const remove = async (id) => {
    return usersCollRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove, getByUsername, verifyCredentials}