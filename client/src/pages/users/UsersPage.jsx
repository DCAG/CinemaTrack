import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

function UsersPage() {
    const location = useLocation()

    return (
    <div className='main-pages'>
        <h1>
            Users
        </h1>
        <nav className='main-nav'>
            <ul>
                <li className={location.pathname.match(/users\/*$/)?'selected-link':''}>
                    <Link to='.'>All Users</Link>
                </li>
                <li className={location.pathname.match(/users\/add\/*$/)?'selected-link':''}>
                    <Link to='add'>Add User</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default UsersPage
