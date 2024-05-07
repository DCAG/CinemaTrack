const errorMessages = require('../utils/errorMessages') 

const permissionsMatrix = {
    '/movies': {
        'GET': ['View Movies'],
        'POST': ['Create Movies'],
        'PUT': ['Update Movies'],
        'DELETE': ['Delete Movies']
    },
    '/subscriptions': {
        'GET': ['View Subscriptions'],
        'POST': ['Create Subscriptions'],
        'PUT': ['Update Subscriptions'],
        'DELETE': ['Delete Subscriptions']
    },
    '/members': {
        'GET': ['View Subscriptions'],
        'POST': ['Create Subscriptions'],
        'PUT': ['Update Subscriptions'],
        'DELETE': ['Delete Subscriptions']
    },
    '/users': {
        'GET': ['View Users','View Users2'],
        'POST': ['Create Users'],
        'PUT': ['Update Users'],
        'DELETE': ['Delete Users']
    }
}

/**
 * verify valid permissions by cross referencing the url, the method and
 * the user's permissions with the permissions matrix.
 * @param {*} baseUrl 
 * @param {*} method 
 * @param {*} userPermissions 
 * @returns true if the user has the required permissions, throw an error if not
 * @throws RESTRICTED_PAGE_ACCESS_MISSING_PERMISSION
 */
const verifyPermissions = (baseUrl, method, userPermissions) => {
    const permissionsRequired = permissionsMatrix[baseUrl][method]
    permissionsRequired.forEach(requiredPermission => {
        if(!userPermissions.includes(requiredPermission)){
            throw errorMessages.RESTRICTED_PAGE_ACCESS_MISSING_PERMISSION(requiredPermission)
        } 
    });
    return true
}

/**
 * Authorization middleware
 * @description must come after authentication middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns output of next middleware call
 */
module.exports = (req, res, next) => {
    const isAdmin = req.user.user.username === 'admin'
    const baseUrl = req.baseUrl
    const method = req.method
    const userPermissions = req.user.user.permissions
    try{
        if(isAdmin || verifyPermissions(baseUrl, method, userPermissions)){   
            next();
        }
    }
    catch(error){
        return res.status(403).send(error)
    }
};