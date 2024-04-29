//import {v4 as uuidv4} from 'uuid'

import axios from "axios";
import { createSelector } from "reselect";

var initialState = {
    movies: [],
    members: [],
    users: [],
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
          const index = state.movies.findIndex(movie => { return movie._id == action.payload._id });
          movies[index] = action.payload
          return {...state, movies: movies} 
        case 'MOVIE_DELETED':
          return {...state, movies: state.movies.filter(movie => movie._id !== action.payload)};
        case 'SUB_CREATE':
            return state;
        case 'SUB_DELETE':
            return state;
        case 'MEMBERS_LOADING':
          return {...state, status: 'loading'}
        case 'MEMBERS_LOADED':
          return {...state, status: 'idle', members: action.payload}
        case 'MEMBER_CREATE':
        return state;
        case 'MEMBER_UPDATE':
            return state;
        case 'MEMBER_DELETE':
            return state;
        case 'USER_CREATE':
            return state;
        case 'USER_UPDATE':
            return state;
        case 'USER_DELETE':
            return state;
        default:
            return state;
    }
}

const CINEMA_BASE_URL = 'http://localhost:3001'

// Action Creators
export const moviesLoaded = (payload) => ({ type: 'MOVIES_LOADED', payload: payload })
export const moviesLoading = () => ({ type: 'MOVIES_LOADING' })
export const fetchDataError = (error) => ({ type: 'FETCH_DATA_ERROR', payload: error })
export const movieUpdated = (movie) => ({ type: 'MOVIE_UPDATED', payload: movie })
export const movieCreated = (movie) => ({ type: 'MOVIE_CREATED', payload: movie })
export const movieDeleted = (id) => ({ type: 'MOVIE_DELETED', payload: id })

export const membersLoaded = (payload) => ({ type: 'MEMBERS_LOADED', payload: payload })
export const membersLoading = () => ({ type: 'MEMBERS_LOADING' })

// Thunk Function
export function movieDelete(id) {
  return async (dispatch, getState) => {
    try{
      const {data} = await axios.delete(CINEMA_BASE_URL + '/movies/' + id)
      dispatch(movieDeleted(data._id))
    }
    catch(error){
      dispatch(fetchDataError(error))
      const stateAfterError = getState()
      console.log('[movieDeleted] error: ', stateAfterError.error)
    }
  }
}

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

export async function fetchMovies(dispatch, getState) {
  try{
    dispatch(moviesLoading())
    const stateBefore = getState()
    console.log('Movies before dispatch: ', stateBefore.movies.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/movies')
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

export async function fetchMembers(dispatch, getState) {
  try{
    dispatch(membersLoading())
    const stateBefore = getState()
    console.log('Members before dispatch: ', stateBefore.members.length)
    const {data} = await axios.get(CINEMA_BASE_URL + '/members')
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
// Memoized selectors
export const selectMoviesIdsNames = createSelector(
  state => state.movies,
  movies => movies.map(movie => ({ _id: movie._id, name: movie.name }))
)

export default rootReducer