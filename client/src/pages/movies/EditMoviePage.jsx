import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'

function EditMoviePage() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [movie, setMovie] = useState({name: '', genres: [], image: '', premiered: ''})
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMovie(previous => {return {...previous, [name]: value}})
    }
    const handleUpdate = () => {
        dispatch({type:'MOVIE_UPDATE',payload:movie})
        navigate('/movies/all')
    }

    const handleCancel = () => {
        navigate('/movies/all')
    }
    useEffect(() => {
        setMovie(params.movie)
    },[movie])
    return (
    <div>
        <h1>
            Edit Movie: {movie.name}
        </h1>
        Name: <input type="text" name="name" value={movie.name} onChange={handleChange} /> <br />
        Genres: <input type="text" name="genres" value={movie.genres.split(',')} onChange={handleChange} /> <br />
        Image URL: <input type="url" name="image" value={movie.image} onChange={handleChange} /> <br />
        Premiered: <input type="date" name="premiered" value={premiered} onChange={handleChange} /> <br />
        <button onClick={handleUpdate}>update</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default EditMoviePage
