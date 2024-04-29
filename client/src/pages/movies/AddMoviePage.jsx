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
    const handleSave = () => {
        dispatch(movieCreate(movie))
        navigate('../')
    }

    const handleCancel = () => {
        navigate('../')
    }
    return (
    <div>
        Name: <input type="text" name="name" onChange={handleChange} /> <br />
        Genres: <input type="text" name="genres" onChange={handleChange} /> <br />
        Image URL: <input type="url" name="image" onChange={handleChange} /> <br />
        Premiered: <input type="date" name="premiered" onChange={handleChange} /> <br />
        <button onClick={handleSave}>save</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default AddMoviePage
