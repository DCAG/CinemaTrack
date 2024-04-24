import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function MoviesPage() {
    return (
    <div>
        <h1>
            MoviesPage
        </h1>
        <nav>
            <ul>
                <li>
                    <Link to='.'>All Movies</Link>
                </li>
                <li>
                    <Link to='add'>Add Movie</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default MoviesPage
