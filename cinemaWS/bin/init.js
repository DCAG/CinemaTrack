const user = require('../services/usersService')
const uuid = require('uuid')

const adminId = '661fdef470d2fa53a3c773c9'

const adminExists = async () => {
  return await user.getById(adminId) != null
}

const createAdminUser = async () => {
  if (!await adminExists()) {
    const password = uuid.v4()
    await user.create({
      _id: adminId,
      firstName: "admin",
      lastName: "admin",
      sessionTimeout: 60,
      username: "admin",
      password: password,
      permissions: [
        // redundant - the admin gets access by its username (username "admin" has access to everything)
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movies"
      ]
    })
    console.log('[First Time Run]', 'admin user was created')
    console.log('[First Time Run]', 'admin password:', password)
  }
}

module.exports = createAdminUser

