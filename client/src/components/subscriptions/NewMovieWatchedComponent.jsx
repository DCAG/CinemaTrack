import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscriptionCreate, selectMoviesIdsNames } from '../../redux/reducer'
function NewMovieWatchedComponent({memberId, watched}) {
  const dispatch = useDispatch()
  const movies = useSelector(selectMoviesIdsNames)
  const [subscription, setSubscription] = useState({movie: '', date: (new Date()).toISOString().replace(/T.*Z$/,'')})
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setSubscription(previous => { return {...previous, [name]: value}})
  }
  const handleSubscribe = () => {
    if(!subscription.movie || !subscription.date){
      return
    }

    dispatch(subscriptionCreate({...subscription,member: memberId}))
    setSubscription({...subscription, movie: ''})
  }
  return (
    <div className='newmoviesub-component'>
        <h3>Add a new movie</h3>
        <select name="movie" value={subscription.movie} onChange={handleChange}>
          <option value="" disabled>select a movie</option>
          {
            movies
            ?.filter(movie => !watched?.includes(movie._id))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(movie => {
                return (
                    <option key={movie._id} value={movie._id}>{movie.name}</option>
                )
            })
          }
        </select>
        <input type="date" id="" name="date" value={subscription.date} onChange={handleChange}/> <br />
        <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default NewMovieWatchedComponent