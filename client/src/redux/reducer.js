//import {v4 as uuidv4} from 'uuid'

import axios from "axios";
import { createSelector } from "reselect";

//TODO: split redux store to slices
var initialState = {
    movies: [],
    members: [],
    users: [],
    subscriptions: [],
    status: 'idle', // loading
    error: null
}


export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'MOVIES_LOADING':
          return {...state, status: 'loading'}
        case 'MOVIES_LOADED':
          return {...state, status: 'idle', movies: action.payload}
        case 'FETCH_DATA_ERROR':
            return { ...state, error: action.payload, status: 'idle' };
        case 'MOVIE_CREATED':
            return { ...state, movies: [...state.movies, action.payload]};
        case 'MOVIE_UPDATED':
          const movies = [...state.movies];
          const movieIndex = state.movies.findIndex(movie => { return movie._id == action.payload._id });
          movies[movieIndex] = action.payload
          return {...state, movies: movies} 
        case 'MOVIE_DELETED':
          return {...state, movies: state.movies.filter(movie => movie._id !== action.payload)};
        case 'SUB_LOADING':
          return {...state, status: 'loading'}
        case 'SUB_LOADED':
          return {...state, status: 'idle', subscriptions: action.payload}
        case 'SUB_CREATED': // also updated (sending: {movie,date,member} and getting {member,movies:[{movie,date}]})
          const subscriptions = [...state.subscriptions];
          const subsIndex = state.subscriptions.findIndex(sub => { return sub._id == action.payload._id });
          if(subsIndex == -1){
            // if didn't exist before
            subscriptions.push(action.payload)
          }
          else{
            // if existed, then the subscription object updated - replace it
            subscriptions[subsIndex] = action.payload
          }
          return {...state, subscriptions}
        case 'SUB_DELETED':
          // delete the entire subscriptions of a specific user (subscription object in the DB {id,member,movies:[{movie,date}]})
          return {...state, subscriptions: state.subscriptions.filter(sub => sub._id !== action.payload)};
        case 'MEMBERS_LOADING':
          return {...state, status: 'loading'}
        case 'MEMBERS_LOADED':
          return {...state, status: 'idle', members: action.payload}
        case 'MEMBER_CREATED':
          return { ...state, members: [...state.members, action.payload]};
        case 'MEMBER_UPDATED':
          const members = [...state.members];
          const memberIndex = state.members.findIndex(member => { return member._id == action.payload._id });
          movies[memberIndex] = action.payload
          return {...state, members: members} 
        case 'MEMBER_DELETED':
          return {...state, members: state.members.filter(member => member._id !== action.payload)};
        case 'USERS_LOADING':
          return {...state, status: 'loading'}
        case 'USERS_LOADED':
          return {...state, status: 'idle', users: action.payload}
        case 'USER_UPDATED':
          const users = [...state.users];
          const userIndex = state.users.findIndex(user => { return user._id == action.payload._id });
          users[userIndex] = action.payload
          return {...state, users: users} 
        case 'USER_CREATED':
            return { ...state, users: [...state.users, action.payload]};
        case 'USER_DELETED':
            return {...state, users: state.users.filter(user => user._id !== action.payload)};
        default:
            return state;
    }
}

const CINEMA_BASE_URL = 'http://localhost:3001'

//#region Action Creators
export const moviesLoaded = (payload) => ({ type: 'MOVIES_LOADED', payload: payload })
export const moviesLoading = () => ({ type: 'MOVIES_LOADING' })
export const fetchDataError = (error) => ({ type: 'FETCH_DATA_ERROR', payload: error })
export const movieUpdated = (movie) => ({ type: 'MOVIE_UPDATED', payload: movie })
export const movieCreated = (movie) => ({ type: 'MOVIE_CREATED', payload: movie })
export const movieDeleted = (id) => ({ type: 'MOVIE_DELETED', payload: id })

export const membersLoaded = (payload) => ({ type: 'MEMBERS_LOADED', payload: payload })
export const membersLoading = () => ({ type: 'MEMBERS_LOADING' })
export const memberUpdated = (member) => ({ type: 'MEMBER_UPDATED', payload: member })
export const memberCreated = (member) => ({ type: 'MEMBER_CREATED', payload: member })
export const memberDeleted = (id) => ({ type: 'MEMBER_DELETED', payload: id })

export const usersLoaded = (payload) => ({ type: 'USERS_LOADED', payload: payload })
export const usersLoading = () => ({ type: 'USERS_LOADING' })
export const userUpdated = (user) => ({ type: 'USER_UPDATED', payload: user })
export const userCreated = (user) => ({ type: 'USER_CREATED', payload: user })
export const userDeleted = (id) => ({ type: 'USER_DELETED', payload: id })

export const subscriptionsLoaded = (payload) => ({ type: 'SUB_LOADED', payload: payload })
export const subscriptionsLoading = () => ({ type: 'SUB_LOADING' })
export const subscriptionCreated = (subscription) => ({ type: 'SUB_CREATED', payload: subscription })
export const subscriptionDeleted = (id) => ({ type: 'SUB_DELETED', payload: id })
//#endregion

//#region Auth
//TODO:consider making a wrapper around web requests to make the calls look simpler and handle emitted errors in central location - hopefully easier
const getHeaders = () => {
  const accessToken = sessionStorage['Authorization']
  const headers = {'x-access-token': "Bearer " + accessToken}
  return headers
}
//#endregion

//#region Thunk Functions
// 'Delete Subscriptions',
export function subscriptionDelete(id) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.delete(CINEMA_BASE_URL + '/subscriptions/' + id)
      dispatch(subscriptionDeleted(data._id))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[subscriptionDeleted] error: ', stateAfterError.error)
    }
  }
}

// 'Update Subscriptions',
export function subscriptionCreate(subscription) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.post(CINEMA_BASE_URL + '/subscriptions/',subscription)
      dispatch(subscriptionCreated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[subscriptionCreated] error: ', stateAfterError.error)
    }
  }
}

// 'View Subscriptions',
export async function fetchSubscriptions(dispatch, getState) {
  try{
    dispatch(subscriptionsLoading())
    const stateBefore = getState()
    console.log('Subscriptions before dispatch: ', stateBefore.subscriptions.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/subscriptions', {headers: getHeaders()})
    dispatch(subscriptionsLoaded(data))
    const stateAfter = getState()
    console.log('Subscriptions after dispatch: ', stateAfter.subscriptions.length)
  }
  catch(error){
    dispatch(fetchDataError(error))
    const stateAfterError = getState()
    console.log('[fetchSubscriptions] error: ', stateAfterError.error)
  }
}

// 'Delete Movies',
export function movieDelete(id) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.delete(CINEMA_BASE_URL + '/movies/' + id)
      dispatch(movieDeleted(data._id))
      // NOTE: refresh all subscriptions after movie was deleted (so the 'movies.movie' virtual property will not be populated by mongoose for the deleted movie)
      dispatch(fetchSubscriptions)
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[movieDeleted] error: ', stateAfterError.error)
    }
  }
}

// 'Create Movies',
export function movieCreate(movie) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.post(CINEMA_BASE_URL + '/movies/',movie)
      dispatch(movieCreated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[movieCreated] error: ', stateAfterError.error)
    }
  }
}

// 'Update Movies'
export function movieUpdate(id, movie) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.put(CINEMA_BASE_URL + '/movies/' + id, movie)
      dispatch(movieUpdated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[movieUpdate] error: ', stateAfterError.error)
    }
  }
} 

// 'View Movies',
export async function fetchMovies(dispatch, getState) {
  try{
    dispatch(moviesLoading())
    const stateBefore = getState()
    console.log('Movies before dispatch: ', stateBefore.movies.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/movies', {headers: getHeaders()})
    dispatch(moviesLoaded(data))
    const stateAfter = getState()
    console.log('Movies after dispatch: ', stateAfter.movies.length)
  }
  catch(error){
    dispatch(fetchDataError(error))
    const stateAfterError = getState()
    console.log('[fetchMovies] error: ', stateAfterError.error)
  }
}

// 'Delete Subscriptions',
export function memberDelete(id) {
  return async (dispatch, getState) => {
    try{
      // NOTE: deletes member, and subscription object if one exists
      const {data} = await axios.delete(CINEMA_BASE_URL + '/members/' + id)
      dispatch(memberDeleted(data.member._id))
      dispatch(subscriptionDeleted(data.subscription?._id))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[memberDeleted] error: ', stateAfterError.error)
    }
  }
}

// 'Create Subscriptions',
export function memberCreate(member) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.post(CINEMA_BASE_URL + '/members/',member)
      dispatch(memberCreated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[memberCreated] error: ', stateAfterError.error)
    }
  }
}

// 'Update Subscriptions',
export function memberUpdate(id, member) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.put(CINEMA_BASE_URL + '/members/' + id, member)
      dispatch(memberUpdated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[memberUpdate] error: ', stateAfterError.error)
    }
  }
} 

// 'View Subscriptions',
export async function fetchMembers(dispatch, getState) {
  try{
    dispatch(membersLoading())
    const stateBefore = getState()
    console.log('Members before dispatch: ', stateBefore.members.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/members', {headers: getHeaders()})
    dispatch(membersLoaded(data))
    const stateAfter = getState()
    console.log('Members after dispatch: ', stateAfter.members.length)
  }
  catch(error){
    dispatch(fetchDataError(error))
    const stateAfterError = getState()
    console.log('[fetchMembers] error: ', stateAfterError.error)
  }
}

// Admin Only
export function userDelete(id) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.delete(CINEMA_BASE_URL + '/users/' + id)
      dispatch(userDeleted(data._id))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[userDeleted] error: ', stateAfterError.error)
    }
  }
}

// Admin Only
export function userCreate(user) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.post(CINEMA_BASE_URL + '/users/',user)
      dispatch(userCreated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[userCreated] error: ', stateAfterError.error)
    }
  }
}

// Admin Only
export function userUpdate(id, user) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.put(CINEMA_BASE_URL + '/users/' + id, user)
      dispatch(userUpdated(data))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[userUpdate] error: ', stateAfterError.error)
    }
  }
}

// Admin Only
export async function fetchUsers(dispatch, getState) {
  try{
    dispatch(usersLoading())
    const stateBefore = getState()
    console.log('Users before dispatch: ', stateBefore.users.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/users', {headers: getHeaders()})
    dispatch(usersLoaded(data))
    const stateAfter = getState()
    console.log('Users after dispatch: ', stateAfter.users.length)
  }
  catch(error){
    dispatch(fetchDataError(error))
    const stateAfterError = getState()
    console.log('[fetchUsers] error: ', stateAfterError.error)
  }
}
//#endregion

//#region Memoized selectors
export const selectMoviesIdsNames = createSelector(
  state => state.movies,
  movies => movies.map(movie => ({ _id: movie._id, name: movie.name }))
)

export const selectMembersIds = createSelector(
  state => state.members,
  members => members.map(member => member._id)
)

export const selectUsersIds = createSelector(
  state => state.users,
  users => users.map(user => user._id)
)
//#endregion
export default rootReducer