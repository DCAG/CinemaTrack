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
        <nav style={{display:'inline-block'}}>
            <ul style={{listStyle:'none'}}>
                <li style={{display:'inline-block', padding:'2px'}}>
                    Hello {sessionStorage['firstName']}!
                </li>
                <li style={{display:'inline-block', padding:'2px'}}>
                    <Link to='movies'>Movies</Link>
                </li>
                <li style={{display:'inline-block', padding:'2px'}}>
                    <Link to='subscriptions'>Subscriptions</Link>
                </li>
                <li style={!sessionStorage['isAdmin']?{visibility:'hidden',display:'none'}:{display:'inline-block', padding:'2px'}}>
                    <Link to='users'>Users Management</Link>
                </li>
                <li style={{display:'inline-block', padding:'2px'}}>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default MainPage
