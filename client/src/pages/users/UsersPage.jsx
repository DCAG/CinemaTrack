import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function UsersPage() {
    return (
    <div>
        <h1>
            Users
        </h1>
        <nav style={{display:'inline-block'}}>
            <ul style={{listStyle:'none'}}>
                <li style={{display:'inline-block', padding:'2px'}}>
                    <Link to='.'>All Users</Link>
                </li>
                <li style={{display:'inline-block', padding:'2px'}}>
                    <Link to='add'>Add User</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default UsersPage
