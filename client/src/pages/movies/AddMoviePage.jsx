import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AddMoviePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [movie, setMovie] = useState({name: '', genres: [], image: '', premiered: ''})
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMovie(previous => {return {...previous, [name]: value}})
    }
    const handleSave = () => {
        dispatch({type:'MOVIE_CREATE', payload:movie})
        navigate('/movies/all')
    }

    const handleCancel = () => {
        navigate('/movies/all')
    }
    return (
    <div>
        Name: <input type="text" name="name" value={movie.name} onChange={handleChange} /> <br />
        Genres: <input type="text" name="genres" value={movie.genres.split(',')} onChange={handleChange} /> <br />
        Image URL: <input type="url" name="image" value={movie.image} onChange={handleChange} /> <br />
        Premiered: <input type="date" name="premiered" value={premiered} onChange={handleChange} /> <br />
        <button onClick={handleSave}>save</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default AddMoviePage
