const subscriptionsRepo = require('../repositories/subscriptionsRepo')

const getAll = () => {
    return subscriptionsRepo.getAll()
}

const getById = (id) => {
    return subscriptionsRepo.getById(id)
}

const update = (id,object) => {
    return subscriptionsRepo.update(id,object)
}

const create = async (object) => {
    const {member, movie, date} = object
    const memberSubs = await subscriptionsRepo.getByMemberId(member)
    if(!memberSubs){
        const initialSub = {
            member,
            movies: [{movie,date}]
        }
        return subscriptionsRepo.create(initialSub)
    }

    if(!memberSubs.movies.find(m=>m.movie?._id==movie)){
        memberSubs.movies.push({movie,date})
        return subscriptionsRepo.update(memberSubs._id,memberSubs)
    }

    return memberSubs
}

const remove = async (id) => {
    return subscriptionsRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}