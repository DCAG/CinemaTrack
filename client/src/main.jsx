import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoutes from './utils/ProtectedRoutes'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store.js'
import {fetchMovies, fetchMembers, fetchUsers, fetchSubscriptions} from './redux/reducer.js'

// hitting refresh in the browser will trigger fetching all data (again if already logged in)
// another fetching is performed after login in the [LoginPage](./pages/LoginPage.jsx)
store.dispatch(fetchMovies)
store.dispatch(fetchMembers)
store.dispatch(fetchUsers)
store.dispatch(fetchSubscriptions)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <ProtectedRoutes>
          <App />
        </ProtectedRoutes>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
  ,
)
