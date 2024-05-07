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

/**
 * accepts a simplified movie subscription object and updates it in the DB and returns the full subscription object
 * @description checks whether a subscription object exists for that user (one to one relation), if so updates it, if not creates a new one.
 * @param {*} object {member (id:string), movie (id:string), date (string)}
 * @returns {_id, member, movies: [{_id, movie, date}]} updated or newly created subscription object
 */
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