import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoutes from './utils/ProtectedRoutes'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProtectedRoutes>
        <Provider store={store}>
          <App />
        </Provider>
      </ProtectedRoutes>
    </AuthProvider>
  </BrowserRouter>
  ,
)
