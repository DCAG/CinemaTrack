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
    <div>
        <h1>
            Add New Member
        </h1>
        <br />
        Name: <input type="text" onChange={handleChange} /> <br />
        Email: <input type="text" onChange={handleChange} /> <br />
        City: <input type="text" onChange={handleChange} /> <br />
        <br />
        <button onClick={handleSave}>save</button>
        <button onClick={handleCancel}>cancel</button>
    </div>
    )
}

export default AddMemberPage
