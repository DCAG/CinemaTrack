import React, { useEffect, useState } from 'react'
import MovieComponent from '../../components/movies/MovieComponent'

function AllMoviesPage() {
    const movies = useSelector(store => store.movies)
    const [searchBox, setSearchBox] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const handleClick = () => {
        setSearchResults(movies.filter(movie => movie.name.includes(searchBox)))
    }
    return (
    <div>
        Find A Movie: <input type="text" onChange={e=>setSearchBox(e.target.value)} />
        <button onClick={handleClick}>Find</button> <br />
        <br />
        {
          searchResults.map(movie => {
            return (
                <MovieComponent movie={movie} />
            )
          })
        }
    </div>
    )
}

export default AllMoviesPage
