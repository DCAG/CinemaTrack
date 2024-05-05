
const createPermissionAccessError = (permission) => {
    return {
        name: 'RESTRICTED_PAGE_ACCESS_MISSING_PERMISSION',
        message: `Insufficient permissions. permission '${permission}' is required to perform this action.`,
        action: {
            type: 'admin',
            operation: 'addPermission',
            what: permission
        }
    }
}

module.exports = {createPermissionAccessError}