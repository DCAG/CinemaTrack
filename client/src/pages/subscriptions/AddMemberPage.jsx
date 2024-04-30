import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
        dispatch({type:'MEMBER_CREATE', payload:member})
    }
    const handleCancel = () => {
        navigate('../')
    }
    return (
    <div className='generic-form'>
        <h1>
            Add New Member
        </h1>
        <br />
        <label>Name:</label> <input type="text" onChange={handleChange} /> <br />
        <label>Email:</label> <input type="text" onChange={handleChange} /> <br />
        <label>City:</label> <input type="text" onChange={handleChange} /> <br />
        <br />
        <button onClick={handleSave}>save</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default AddMemberPage
