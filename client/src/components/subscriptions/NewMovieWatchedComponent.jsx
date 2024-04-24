import React, { useState } from 'react'

function NewMovieWatchedComponent({watched}) {
  const [subscription, setSubscription] = useState({movie: '', date: ''})
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setSubscription(previous => { return {...previous, [name]: value}})
  }
  const handleSubscribe = () => {

  }
  return (
    <div>
        <h3>Add a new movie</h3>
        <select name="movie" value={subscription.movieId} onChange={handleChange}>
          {
            movies.filter(movie => !watched.includes(movie.id)).map(movie => {
                return (
                    <option value={movie.id}>{movie.name}</option>
                )
            })
          }
        </select>
        <input type="date" name="date" onChange={handleChange} />
        <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default NewMovieWatchedComponent