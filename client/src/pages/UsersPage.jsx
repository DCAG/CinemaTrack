import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function UsersPage() {
    return (
    <div>
        <h1>
            Users
        </h1>
        <nav>
            <ul>
                <li>
                    <Link to='all'>All Users</Link>
                </li>
                <li>
                    <Link to='add'>Add User</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default UsersPage
