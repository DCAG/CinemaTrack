import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { memberCreate } from '../../redux/reducer'

function AddMemberPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [member, setMember] = useState({name:'', email:'', city:''})
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMember(previous => { return {...previous, [name]: value}})
    }
    const handleSave = () => {
        dispatch(memberCreate(member))
        navigate('../')
    }
    const handleCancel = () => {
        navigate('../')
    }
    return (
    <div className='generic-form'>
        <h2>
            Add New Member
        </h2>
        <br />
        <label>Name:</label> <input type="text" name="name" onChange={handleChange} /> <br />
        <label>Email:</label> <input type="text" name="email" onChange={handleChange} /> <br />
        <label>City:</label> <input type="text" name="city" onChange={handleChange} /> <br />
        <br />
        <button onClick={handleSave}>save</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default AddMemberPage
