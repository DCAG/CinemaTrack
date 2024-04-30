import React, {useEffect, useState} from 'react'
import NewMovieWatchedComponent from './NewMovieWatchedComponent'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MoviesWatchedComponent({memberId}) {
  const allSubscriptions = useSelector(store => store.subscriptions)
  const mySubscriptions = allSubscriptions.find(sub=>sub.member._id==memberId)
  const subscriptions = mySubscriptions?.movies??[] 
  const [showDialog, setShowDialog] = useState(false)
  const handleSubscribe = () => {
      setShowDialog(previous => !previous)
  }

  return (
    <div className='movieswatched-component'>
        <h3>Movies Watched</h3>
        <button onClick={handleSubscribe}>Subscribe to new movie</button>
        <br />
        <div style={!showDialog?{display:'none'}:{}}>
          <NewMovieWatchedComponent memberId={memberId} watched={subscriptions?.map(sub=>sub.movie._id)}/>
        </div>
        <ul>
            {
                subscriptions?.map(sub => {
                    return (
                        <li key={sub.movie._id}><Link to={`/main/movies?name=${sub.movie.name}`}>{sub.movie.name}</Link> {', '+sub.date.replace(/T.*Z$/,'')}</li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default MoviesWatchedComponent