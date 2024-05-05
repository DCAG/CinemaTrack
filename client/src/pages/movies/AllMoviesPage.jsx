import React, { useEffect, useState, useMemo } from 'react'
import MovieComponent from '../../components/movies/MovieComponent'
import { useSelector } from 'react-redux'
import { selectMoviesIdsNames } from '../../redux/reducer'
import { useLocation } from 'react-router-dom'

/**
function to get query params from url
ref: https://v5.reactrouter.com/web/example/query-parameters
*/
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function AllMoviesPage() {
  const movies = useSelector(selectMoviesIdsNames) // memoized selector
  const status = useSelector(store => store.status)
  const [searchResults, setSearchResults] = useState(movies??[])

  const query = useQuery()
  const name = query.get("name")

  useEffect(() => {
    if(name){
      setSearchResults(movies.filter(movie => movie.name.toLowerCase().includes(name.toLowerCase())))
    }
    else{
      setSearchResults(movies)
    }
  },[name, movies])
  
  if(status === 'loading'){
    return <div className='loading' />
  }

  return (
  <div>
    <br />
      <br />
      {
        searchResults.map(movie => {
          return (
              <MovieComponent key={movie._id} id={movie._id} />
          )
        })
      }
  </div>
  )
}

export default AllMoviesPage
