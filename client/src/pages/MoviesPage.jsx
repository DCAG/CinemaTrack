import React from 'react'
import { Outlet } from 'react-router-dom'

function MoviesPage() {
    return (
    <div>
        <h1>
            MoviesPage
        </h1>
        <Outlet />
    </div>
    )
}

export default MoviesPage
