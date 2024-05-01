import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'

function MoviesPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (e) => {
      e.preventDefault()
      const findText = e.target.elements.findText.value
      navigate(findText?'?name='+findText:'.')
    }

    return (
    <div className='main-pages'>
        <h1>
            Movies
        </h1>
        <nav className='main-nav'>
            <ul>
                <li className={location.pathname.match(/movies\/*$/)?'selected-link':''}>
                    <Link to='.'>All Movies</Link>
                </li>
                <li className={location.pathname.match(/movies\/add\/*$/)?'selected-link':''}>
                    <Link to='add'>Add Movie</Link>
                </li>
                <li>
                  <form id="findForm" onSubmit={handleClick}>
                    Find A Movie: <input type="text" name="findText" />
                    <input type="submit" value="Find" />
                  </form>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default MoviesPage
