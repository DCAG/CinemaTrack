import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//TODO: handle and move to redux
const USER_URL = 'http://localhost:3001/users'

function UserComponent(params) {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '', username: '', sessionTimeout: 0, createdDate: '', permissions: []
  })
  useEffect(() => {
    setUser(params.user)
  },[params])

  const handleEdit = () => {
    navigate(`${user._id}/edit`)
  } 
  
  const handleDelete = () => {
    navigate('.')
  }

  return (
    <div>
        Name: {user.name} <br />
        Username: {user.username} <br />
        Session Timeout: {user.sessionTimeout} <br />
        Created Date: {user.createdDate} <br />
        Permissions: {user.permissions.join(', ')} <br />
        <br />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default UserComponent