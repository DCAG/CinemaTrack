import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function MainPage() {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/') // redirect to login page
        //TODO: replace with logout from middleware auth context (?)    
    }

    return (
    <div>
        <h1>
            CinemaTrack
        </h1>
        <h2>
        Movies Subscriptions Management App
        </h2>
        <nav className='main-nav'>
            <ul>
                <li>
                    Hello {sessionStorage['firstName']}!
                </li>
                <li className={location.pathname.includes('movies')?'selected-link':''}>
                    <Link to='movies'>Movies</Link>
                </li>
                <li className={location.pathname.includes('subscriptions')?'selected-link':''}>
                    <Link to='subscriptions'>Subscriptions</Link>
                </li>
                <li  className={location.pathname.includes('users')?'selected-link':''}
                // style={!sessionStorage['isAdmin']?{visibility:'hidden',display:'none'}:{}}
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
