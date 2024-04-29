import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import reduxThunkMiddleware from './thunkMiddleware.js'
import reducer from './reducer.js'

const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware))

export default store