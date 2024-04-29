import React, { useEffect, useState } from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { movieUpdate } from '../../redux/reducer'

function EditMoviePage() {
    const {id} = useParams()
    const movieObj = useSelector(store=>store.movies.find(m=>m._id===id),shallowEqual)
    const defaultObj = {name: '', genres: [], image: '', premiered: ''}
    const [movie, setMovie] = useState(movieObj??defaultObj)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMovie(previous => {return {...previous, [name]: value}})
    }
    const handleUpdate = () => {
        dispatch(movieUpdate(id,movie))
        navigate('.')
    }

    const handleCancel = () => {
        navigate('../')
    }
    
    useEffect(()=>{
        setMovie(movieObj??defaultObj)
    },[movieObj])

    return (
    <div>
        <h1>
            Edit Movie: {movie.name}
        </h1>
        Name: <input type="text" name="name" value={movie.name} onChange={handleChange} /> <br />
        Genres: <input type="text" name="genres" value={movie.genres.join(', ')} onChange={handleChange} /> <br />
        Image URL: <input type="url" name="image" value={movie.image} onChange={handleChange} /> <br />
        Premiered: <input type="date" name="premiered" value={movie.premiered.replace(/T.+Z$/,'')} onChange={handleChange} /> <br />
        <button onClick={handleUpdate}>update</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default EditMoviePage
