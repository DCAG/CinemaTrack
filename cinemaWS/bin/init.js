const user = require('../repositories/usersCollRepo')
const uuid = require('uuid')

const adminId = '661fdef470d2fa53a3c773c9'

const adminExists = async () => {
    return await user.getById(adminId) != null
} 

const createAdminUser = async () => {
    if(!await adminExists()){
        const password = uuid.v4()
        await user.create({
            _id: adminId,
            username: "admin",
            password: password
        })
        console.log('[First Time Run]','admin user was created')
        console.log('[First Time Run]','admin password:', password)
    }
}

module.exports = createAdminUser

