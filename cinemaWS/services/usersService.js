const usersCollRepo = require('../repositories/usersCollRepo')
const usersFileRepo = require('../repositories/usersFileRepo')
const permissionsFileRepo = require('../repositories/permissionsFileRepo')
const errorMessages = require('../utils/errorMessages')

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

const getByUsername = async (username) => {
    const user = await usersCollRepo.getByUsername(username)
    return await getById(user._id.toString())
}

const verifyCredentials = async (username, password) => {
    if(!username){
        return false
    }
    const credentials = await usersCollRepo.getByUsername(username)
    if(!credentials || !credentials.password){
        // either user does not exist or was created by admin and password was not set
        return false
    }
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
     
    if(null==creds){
        return null
    }

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

const createaccount = async ({username,password}) => {
    if(!password.trim()){
        throw errorMessages.USER_PASS_EMPTY
    }
    const creds = await usersCollRepo.getByUsername(username)
    if(!creds){
        throw errorMessages.USER_NOT_EXIST
    }
    if(creds.password){
        // attempt to prevent password change for existing user
        // security concern: even though the user exist throw the same error as before
        // prevent giving knowlegde about existance of a user for perpetrator
        throw errorMessages.USER_NOT_EXIST
    }
    
    await usersCollRepo.update(creds._id,{username, password})
    // returning true for successful account creation - not to return sensitive information (password)
    return true
}

const update = async (id,object) => {
    let userToUpdate = {...object} // prepare object to update in 'users.json' file
    delete userToUpdate.permissions // sent only to permissions file
    delete userToUpdate.createdDate // cannot be changed
    await Promise.all([
        usersFileRepo.update(id, userToUpdate),
        usersCollRepo.update(id,{username: object.username}),
        permissionsFileRepo.update(id,{permissions: object.permissions})
    ])
    return getById(id)
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
    const createdUser = await getById(data._id.toString())
    return createdUser
}

const remove = async (id) => {
    const data = await Promise.all([
        usersCollRepo.remove(id),
        usersFileRepo.remove(id),
        permissionsFileRepo.remove(id),
    ])
    const returnValue = data[0]??{}
    delete returnValue.password
    return returnValue
}

module.exports = {getAll, getById, create, update, remove, getByUsername, verifyCredentials, createaccount}