const memberRepo = require('../repositories/memberRepo')
const subscriptionRepo = require('../repositories/subscriptionRepo')

const getAll = () => {
    return memberRepo.getAll()
}

const getById = (id) => {
    return memberRepo.getById(id)
}

const update = (id,object) => {
    return memberRepo.update(id,object)
}

const create = (object) => {
    return memberRepo.create(object)
}

const remove = async (id) => {
    /**
     * REQ: Click on “Delete” button will delete all the user’s data
     * (including the relevant data from the movies data sources
     *  */ 
    const memberSub = await subscriptionRepo.getByMemberId(id)
    const [member, subscription] = await Promise.all([
        memberRepo.remove(id),
        memberSub?subscriptionRepo.remove(memberSub._id):null,
    ])
    return {member, subscription}
}

module.exports = {getAll, getById, create, update, remove}