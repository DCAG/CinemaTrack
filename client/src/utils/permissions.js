const PERMISSIONS_LIST = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
]

const PERMISSIONS_DEPANDENCY_TREE = {
    'View Subscriptions': [
        'Create Subscriptions',
        'Delete Subscriptions',
        'Update Subscriptions',
    ],
    'View Movies': [
        'Create Movies',
        'Delete Movies',
        'Update Movies'
    ]
}

const convertPermissionsFromList = (permissionsList) => {
    let result = {}
    PERMISSIONS_LIST.forEach(item => {result[item] = Array.isArray(permissionsList) && permissionsList.includes(item)})
    return result
}

const convertPermissionsToList = (permissionsObject) => {
    return PERMISSIONS_LIST.filter(permission => permissionsObject[permission])
}

/**
 * @description checks dependencies of permissions. creates an object with required dependencies for the given permission (without the given permission itself!).
 * @param {string} permissionName permissions name from the list
 * @param {boolean} isAdded value - true if the permission is checked or false if it was unchecked
 * @returns permissions object with boolean values: false for removed, true for added
 */
const getPermissionDependencies = (permissionName, isAdded) => {
    let dependency = {}
    if(isAdded){
        if(PERMISSIONS_DEPANDENCY_TREE['View Subscriptions'].includes(permissionName)){            
            dependency['View Subscriptions'] = true
        }
        else if(PERMISSIONS_DEPANDENCY_TREE['View Movies'].includes(permissionName)){
            dependency['View Movies'] = true
        }
    }
    else{
        if('View Subscriptions' === permissionName){
            PERMISSIONS_DEPANDENCY_TREE['View Subscriptions'].forEach((permission)=>{
                dependency[permission] = false
            })
        }
        else if('View Movies' === permissionName){
            PERMISSIONS_DEPANDENCY_TREE['View Movies'].forEach((permission)=>{
                dependency[permission] = false
            })
        }
    }
    return dependency
}

const hasPermission = (permission) => {
    return sessionStorage['permissions']?.includes(permission)
}

export {hasPermission, getPermissionDependencies, convertPermissionsFromList, convertPermissionsToList}