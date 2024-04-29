import React, {useEffect, useState} from 'react'
import NewMovieWatchedComponent from './NewMovieWatchedComponent'
import { Link } from 'react-router-dom'
function MoviesWatchedComponent({subscriptions}) {
  const [showDialog, setShowDialog] = useState(false)
  const handleSubscribe = () => {
      setShowDialog(previous => !previous)
  }
  useEffect(() => {
    console.log(subscriptions?.map(sub=>sub.movie._id))
  },[])
  return (
    <div>
        <h2>Movies Watched</h2>
        <button onClick={handleSubscribe}>Subscribe to new movie</button>
        <br />
        <div style={!showDialog?{display:'none'}:{}}>
          <NewMovieWatchedComponent watched={subscriptions?.map(sub=>sub.movie._id)}/>
        </div>
        <ul>
            {
                subscriptions?.map(sub => {
                    return (
                      //TODO: A click on a movie link will redirect to “All Movies” page that present ONLY the selected movie.
                        <li key={sub.movie._id}><Link to={`/main/movies?find=${sub.movie._id}`}>{sub.movie.name}</Link> {', '+sub.date.replace(/T.*Z$/,'')}</li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default MoviesWatchedComponent