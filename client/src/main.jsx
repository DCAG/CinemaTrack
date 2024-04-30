import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

//TODO: Move the fetching of initial data after login (or retry after so if the user is already logged in it will work as well)
import store from './redux/store.js'
import {fetchMovies, fetchMembers, fetchUsers, fetchSubscriptions} from './redux/reducer.js'
store.dispatch(fetchMovies)
store.dispatch(fetchMembers)
store.dispatch(fetchUsers)
store.dispatch(fetchSubscriptions)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
)
