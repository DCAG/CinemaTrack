import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { movieCreate } from '../../redux/reducer'
function AddMoviePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [movie, setMovie] = useState({name: '', genres: [], image: '', premiered: ''})
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        if(name==='genres'){
            value = value.split(',').map(v=>v.trim())
        }
        setMovie(previous => {return {...previous, [name]: value}})
    }
    const handleSave = (e) => {
        e.preventDefault()
        dispatch(movieCreate(movie))
        navigate('../')
    }

    const handleCancel = () => {
        navigate('../')
    }
    return (
    <div>
        <form className='generic-form' onSubmit={handleSave}>
            <label>Name:</label> <input type="text" name="name" onChange={handleChange} required /> <br />
            <label>Genres:</label> <input type="text" name="genres" onChange={handleChange} required /> <br />
            <label>Image URL:</label> <input type="url" name="image" onChange={handleChange} required /> <br />
            <label>Premiered:</label> <input type="date" name="premiered" onChange={handleChange} required /> <br />
            <br />
            <button type='submit'>save</button>
            <button onClick={handleCancel}>cancel</button>
        </form>
    </div>
    )
}

export default AddMoviePage
