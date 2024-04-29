import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

function MoviesPage() {
    const location = useLocation()
    return (
    <div>
        <h1>
            MoviesPage
        </h1>
        <nav className='main-nav'>
            <ul>
                <li className={location.pathname.endsWith('movies')?'selected-link':''}>
                    <Link to='.'>All Movies</Link>
                </li>
                <li className={location.pathname.endsWith('add')?'selected-link':''}>
                    <Link to='add'>Add Movie</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default MoviesPage
