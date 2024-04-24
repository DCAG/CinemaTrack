import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function EditMemberPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {memberId} = useParams()
    const [member, setMember] = useState({name:'', email:'', city:''})
    useEffect(() => {
      //memberId
      setMember()
    },[memberId])
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setMember(previous => { return {...previous, [name]: value}})
    }
    const handleUpdate = () => {
        dispatch({type:'MEMBER_UPDATE',payload:member})
    }
    const handleCancel = () => {
        navigate('all')
    }
    return (
    <div>
        <h1>
            Edit Member: {member.name}
        </h1>
        <br />
        Name: <input type="text" value={member.name} onChange={handleChange} /> <br />
        Email: <input type="text" value={member.email} onChange={handleChange} /> <br />
        City: <input type="text" value={member.city} onChange={handleChange} /> <br />
        <br />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
}

export default EditMemberPage
