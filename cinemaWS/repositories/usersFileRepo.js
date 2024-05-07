const jsonfile = require('jsonfile')
const errorMessages = require('../utils/errorMessages')

const USERS_FILE = './users.json'

const getAll = async () => {
  try {
    const data = await jsonfile.readFile(USERS_FILE)??[]
    return data
  }
  catch (err) {
    if (err.code == 'ENOENT' & err.errno == -4058) {
      return null
    }
    else {
      throw err
    }
  }
}

const getById = async (id) => {
  try {
    const data = await jsonfile.readFile(USERS_FILE)??[]
    return data.find(item => item.id === id)
  }
  catch (error) {
    if (error.code == 'ENOENT' & error.errno == -4058) {
      return null 
    }
    else {
      throw error
    }
  }
}

const getByUsername = async (username) => {
  try{
    const data = await jsonfile.readFile(USERS_FILE)
    return data.find(item => item.username === username)
  }
  catch (error) {
    if (error.code == 'ENOENT' & error.errno == -4058) {
      return null
    }
    else {
      throw error
    }
  }
}

const create = async (object) => {
  if (!(object.id && object.createdDate && object.firstName && object.lastName && object.username && object.sessionTimeout)) {
    throw errorMessages.USER_CREATION_FAILED_MISSING_FIELDS(object)
  }
  try {
    const data = await jsonfile.readFile(USERS_FILE)
    await jsonfile.writeFile(USERS_FILE, [...data, object])
    return object
  }
  catch (error) {
    if (error.code == 'ENOENT' & error.errno == -4058) {
      // if the file doesn't exist - just write to it
      await jsonfile.writeFile(USERS_FILE, [...[],object])
      return object
    }
    else {
      throw errorMessages.USER_CREATION_FAILED(object, error)
    }
  }
}

const update = async (id, object) => {
  try {
    const data = await jsonfile.readFile(USERS_FILE)
    const index = data.findIndex(item => item.id === id)
    data[index] = { ...data[index], ...object }
    jsonfile.writeFile(USERS_FILE, data)
    return data[index]
  }
  catch (error) {
    throw errorMessages.USER_UPDATE_FAILED(id,object,error)
  }
}

const remove = async (id) => {
  try {
    const data = await jsonfile.readFile(USERS_FILE)
    const newData = data.filter(item => item.id !== id)
    jsonfile.writeFile(USERS_FILE, newData)
    return `${id} was deleted`
  }
  catch (error) {
    throw errorMessages.USER_REMOVAL_FAILED(id,error)
  }
}

module.exports = { getAll, getById, getByUsername, create, update, remove }