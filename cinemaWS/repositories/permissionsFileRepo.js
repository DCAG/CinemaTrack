const jsonfile = require('jsonfile')
const errorMessages = require('../utils/errorMessages')

const PERMISSIONS_FILE = './auth/permissions.json'
const VALID_PERMISSIONS = [
    "View Subscriptions",
    "Create Subscriptions",
    "Delete Subscriptions",
    "Update Subscriptions",
    "View Movies",
    "Create Movies",
    "Delete Movies",
    "Update Movies"
]

const isValidPermissionsList = (arr) => {
    arr.forEach(element => {
        if(!VALID_PERMISSIONS.includes(element)){
            throw errorMessages.INVALID_PERMISSION(element,arr)
        }
    })
    return true
}

const getAll = async () => {
    const data = await jsonfile.readFile(PERMISSIONS_FILE)
    return data
}

const getById = async (id) => {
    try{
        const data = await jsonfile.readFile(PERMISSIONS_FILE)??[]
        return data.find(item => item.userId === id)
    }
    catch(err){
        if(err.code == 'ENOENT' & err.errno == -4058){
            return null
        } 
        else{ 
            throw err
        }
    }
}

const create = async (object) => {
    if(!(object.permissions && object.userId)){
        throw errorMessages.USER_CREATION_FAILED_MISSING_PERMISSION_FIELDS(object)
    }
    try{
        // assertion only
        object.permissions && !isValidPermissionsList(object.permissions)
        const data = await jsonfile.readFile(PERMISSIONS_FILE)??[]
        jsonfile.writeFile(PERMISSIONS_FILE,[...data, object])
        return object
    }
    catch(error){
        if(error.code == 'ENOENT' & error.errno == -4058){
            // if the file doesn't exist - just write to it
            jsonfile.writeFile(PERMISSIONS_FILE,[...[],object])
            return object
        }
        else{
            throw errorMessages.USER_CREATION_FAILED_PERMISSION_OBJECT(object, error)
        }
    }
}

const update = async (id, object) => {
    try{
        // assertion only
        object.permissions && !isValidPermissionsList(object.permissions)
        const data = await jsonfile.readFile(PERMISSIONS_FILE)
        const index = data.findIndex(item => item.userId === id)
        data[index] = {...data[index],...object}
        jsonfile.writeFile(PERMISSIONS_FILE,data)
        return data[index]
    }
    catch(error){
        throw errorMessages.USER_UPDATE_FAILED_PERMISSION_OBJECT(id, object, error)
    }
}

const remove = async (id) => {
    try{
        const data = await jsonfile.readFile(PERMISSIONS_FILE)
        const newData = data.filter(item => item.userId !== id)
        jsonfile.writeFile(PERMISSIONS_FILE,newData)
        return `${id} was deleted`
    }
    catch(error){
        throw errorMessages.USER_REMOVAL_FAILED_PERMISSION_OBJECT(id,error)
    }
}

module.exports = {getAll, getById, create, update, remove}