import axios from 'axios';

const getHeaders = () => {
  const accessToken = sessionStorage['Authorization']
  const headers = {'x-access-token': "Bearer " + accessToken}
  return headers
}
  
const CINEMA_BASE_URL = 'http://localhost:3001'

const getAll = (urlPath) => axios.get(CINEMA_BASE_URL + '/' + urlPath, {headers: getHeaders()});

const getById = (urlPath, id) => axios.get(CINEMA_BASE_URL + '/' + urlPath + '/' + id, {headers: getHeaders()});

const createItem = (urlPath, obj) => axios.post(CINEMA_BASE_URL + '/' + urlPath, obj, {headers: getHeaders()});

const updateItem = (urlPath, id, obj) => axios.put(CINEMA_BASE_URL + '/' + urlPath + '/' + id, obj, {headers: getHeaders()});

const deleteItem = (urlPath, id) => axios.delete(CINEMA_BASE_URL + '/' + urlPath + '/' + id, {headers: getHeaders()});

export default { getAll, getById, createItem, updateItem, deleteItem };