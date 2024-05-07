import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { memberUpdate } from '../../redux/reducer'

function EditMemberPage() {
    const {id} = useParams()
    const storeMember = useSelector(store => store.members.find(member => member._id===id))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [member, setMember] = useState({name:'', email:'', city:''})
    useEffect(() => {
      setMember(previous => storeMember??previous)
    },[storeMember])
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMember(previous => { return {...previous, [name]: value}})
    }
    const handleUpdate = () => {
        dispatch(memberUpdate(id, member))
        navigate('../')
    }
    const handleCancel = () => {
        navigate('../')
    }
    return (
    <div className='generic-form'>
        <h1>
            Edit Member: {member.name}
        </h1>
        <br />
        <label>Name:</label><input type="text" name="name" value={member.name} onChange={handleChange} /> <br />
        <label>Email:</label><input type="text" name="email" value={member.email} onChange={handleChange} /> <br />
        <label>City:</label><input type="text" name="city" value={member.city} onChange={handleChange} /> <br />
        <br />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
}

export default EditMemberPage
