const jsonfile = require('jsonfile')

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
            throw {
                message: `permission [${element}] is invalid`,
                target: arr
            }
        }
    })
    return true
}

const getAll = async () => {
    const data = await jsonfile.readFile(PERMISSIONS_FILE)
    return data
}

const getById = async (id) => {
    const data = await jsonfile.readFile(PERMISSIONS_FILE)
    return data.find(item => item.userId === id)
}

const create = async (object) => {
    if(!(object.permissions && object.userId)){
        throw {
            message: "one of the fields is missing: userId, permissions",
            target: object
        }
    }
    try{
        // assertion only
        object.permissions && !isValidPermissionsList(object.permissions)
        const data = await jsonfile.readFile(PERMISSIONS_FILE)
        // TODO: check if "username" and "id" are unique, if not throw an error
        jsonfile.writeFile(PERMISSIONS_FILE,[...data, object])
        return object
    }
    catch(error){
        throw {
            message: 'failed to create permissions object',
            target: object,
            innerError: error
        }
    }
}

const update = async (id, object) => {
    try{
        // assertion only
        object.permissions && !isValidPermissionsList(object.permissions)
        const data = await jsonfile.readFile(PERMISSIONS_FILE)
        const index = data.findIndex(item => item.userId === id)
        // thinking: there is an option this way to update the id inside the object... might want to prevent that (or not)
        data[index] = {...data[index],...object}
        // TODO: check if "username" and "id" are unique, if not throw an error
        jsonfile.writeFile(PERMISSIONS_FILE,data)
        return data[index]
    }
    catch(error){
        throw {
            message: 'failed to update permissions object',
            target: [id, object],
            innerError: error
        }
    }
}

const remove = async (id) => {
    try{
        const data = await jsonfile.readFile(PERMISSIONS_FILE)
        const newData = data.filter(item => item.userId === id)
        jsonfile.writeFile(PERMISSIONS_FILE,newData)
        return `${id} was deleted`
    }
    catch(error){
        throw {
            message: 'failed to remove permissions object',
            target: id,
            innerError: error
        }
    }
}

module.exports = {getAll, getById, create, update, remove}