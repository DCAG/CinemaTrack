import React from 'react'
import { useNavigate } from 'react-router-dom'
import SubscriptionsWatchedComponent from './SubscriptionsWatchedComponent'
import { useDispatch, useSelector } from 'react-redux'
import { movieDelete } from '../../redux/reducer'
import { hasPermission } from '../../utils/permissions'

function MovieComponent({id}) {
  const movie = useSelector(store => store.movies.find(movie=>movie._id===id))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEdit = () => {
    navigate(`./${movie._id}/edit`)
  }

  const handleDelete = () => {
    dispatch(movieDelete(id))
    navigate(`../movies`)
  }

  if(!movie){
    return <div></div>
  }

  return (
    <div className='movie-component'>
      <h3>
          {movie.name + ', ' + (new Date(movie.premiered)).getFullYear()}
      </h3>
      genres: {movie.genres ? '"' + movie.genres.join('","') + '"':''}
      <br />
      <img src={movie.image} alt={movie.name + " image"} />
      {
        hasPermission('View Subscriptions') ? <SubscriptionsWatchedComponent subscriptions={movie.subscriptions} /> : <></>
      }
      <br />
      {
        hasPermission('Update Movies') ? <button onClick={handleEdit}>Edit</button> : <></>
      }
      {
        hasPermission('Delete Movies') ? <button onClick={handleDelete}>Delete</button> : <></>
      }
    </div>
  )
}

export default MovieComponent