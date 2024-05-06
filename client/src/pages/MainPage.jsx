import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import { hasPermission } from '../utils/permissions'

function MainPage() {
  const navigate = useNavigate()
  const { logoutUser } = useAuth()
  const handleLogout = () => {
    logoutUser()
    // redirect to login page
    navigate('/')
  }

  return (
    <div>
      <nav className='main-nav'>
        <ul>
          <li>
            Hello {sessionStorage['firstName']}!
          </li>
          <li className={location.pathname.includes('movies') ? 'selected-link' : ''}
            style={!hasPermission('View Movies') ? { display: 'none' } : {}}
          >
            <Link to='movies'>Movies</Link>
          </li>
          <li className={location.pathname.includes('subscriptions') ? 'selected-link' : ''}
            style={!hasPermission('View Subscriptions') ? { display: 'none' } : {}}
          >
            <Link to='subscriptions'>Subscriptions</Link>
          </li>
          <li className={location.pathname.includes('users') ? 'selected-link' : ''}
            style={sessionStorage['username'] !== 'admin' ? { display: 'none' } : {}}
          >
            <Link to='users'>Users Management</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default MainPage
