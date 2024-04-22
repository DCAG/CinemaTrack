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
            Cinemall
        </h1>
        <h2>
        Movies Subscriptions Management App
        </h2>
        <nav>
            <ul>
                <li>
                    Hello {sessionStorage['firstName']}!
                </li>
                <li>
                    <Link to='movies'>Movies</Link>
                </li>
                <li>
                    <Link to='subscriptions'>Subscriptions</Link>
                </li>
                <li style={sessionStorage['isAdmin']??{visibility:'hidden'}}>
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
