import React, { useEffect, useState } from 'react'
import MovieComponent from '../../components/movies/MovieComponent'
import { shallowEqual, useSelector } from 'react-redux'
import LoadingWheel from '../../assets/loading.svg'
import { selectMoviesIdsNames } from '../../redux/reducer'

function AllMoviesPage() {
  // TODO: decide to keep or change back to regular selector
  const movies = useSelector(selectMoviesIdsNames) // memoized selector
  const status = useSelector(store => store.status)
  const [searchResults, setSearchResults] = useState(movies??[])

  const handleClick = (e) => {
    e.preventDefault()
    const findText = e.target.elements.findText.value
    setSearchResults(movies.filter(movie => movie.name.toLowerCase().includes(findText)))
  }

  useEffect(() => {
    setSearchResults(movies)
  },[movies])
  
  if(status === 'loading'){
    //DELETEME: select one spinner and deleteh the others
    {/*return <img src={LoadingWheel} alt="Your SVG" /> */}
    return <div className='loading' />
  }

  return (
  <div>
    {/* TODO: move the find form to the moviesPage and pass a parameter so the results will be based on the parameter */}
    <form id="findForm" onSubmit={handleClick}>
      Find A Movie: <input type="text" name="findText" autoFocus={true} />
      <input type="submit" value="Find" />
    </form>
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
