import React from 'react'
import { useNavigate } from 'react-router-dom'

function MovieComponent({movie}) {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/movies/edit/${movie.id}`)
  }

  const handleDelete = () => {
    navigate(`/movies/all`)
  }
  return (
    <div>
        <h2>
            {movie.name + ',' + movie.premieredYear}
        </h2>
        genres: {movie.genres ? '"' + movie.genres.join('","') + '"':''}
        <br />
        <img src={movie.image} alt={movie.name + " image"} />
        <SubscriptionsWatchedComponent subscriptions={movie.subscriptions} />
        <br />
        <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default MovieComponent