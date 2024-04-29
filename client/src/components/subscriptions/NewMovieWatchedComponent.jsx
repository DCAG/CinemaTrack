import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

function NewMovieWatchedComponent({watched}) {
  const movies = useSelector(store => store.movies.map(movie=>({name:movie.name, _id:movie._id})), shallowEqual)
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
        <select name="movie" onChange={handleChange}>
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
        <input type="date" name="date" value={(new Date()).toISOString().replace(/T.*Z$/,'')} onChange={handleChange} /> <br />
        <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default NewMovieWatchedComponent