const REPLACE_MEs = require('../models/REPLACE_MEsModel')

const getAll = () => {
    return REPLACE_MEs.find().populate('temp1').populate('temp2').exec()
}

const getById = (id) => {
    return REPLACE_MEs.findById(id).populate('temp1').populate('temp2').exec()
}

const update = (id,REPLACE_ME) => {
    return REPLACE_MEs.findByIdAndUpdate(id,REPLACE_ME)
}

const create = (REPLACE_ME) => {
    return REPLACE_MEs.create(REPLACE_ME)
}

const remove = (id) => {
    return REPLACE_MEs.findByIdAndDelete(id)
}


module.exports = {getAll, getById, update, create, remove}