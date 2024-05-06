import React, {useEffect, useState} from 'react'
import NewMovieWatchedComponent from './NewMovieWatchedComponent'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hasPermission } from '../../utils/permissions'

function MoviesWatchedComponent({memberId}) {
  const mySubscriptionsObj = useSelector(store => store.subscriptions.find(sub=>sub.member?._id==memberId))
  //NOTE: checking if subscription.movies.movie is populated (e.g. in case the movie was deleted and the subscription was not updated with the changes)
  const subscriptions = mySubscriptionsObj?.movies.filter(m=>m.movie?._id)??[] 
  const [showDialog, setShowDialog] = useState(false)
  const handleSubscribe = () => {
      setShowDialog(previous => !previous)
  }

  return (
    <div className='movieswatched-component'>
        <h3>Movies Watched</h3>
        {
          hasPermission('Update Subscriptions') ? <button onClick={handleSubscribe}>Subscribe to new movie</button> : <></>
        }
        <br />
        <div style={!showDialog?{display:'none'}:{}}>
          <NewMovieWatchedComponent memberId={memberId} watched={subscriptions?.map(sub=>sub.movie?._id)}/>
        </div>
        <ul>
            {
                subscriptions.map(sub => {
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